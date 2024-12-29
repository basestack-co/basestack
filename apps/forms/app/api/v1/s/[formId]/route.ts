// Utils
import formidable from "formidable";
import { Readable } from "stream";
import requestIp from "request-ip";
import { IncomingMessage } from "http";
import Cors from "cors";
import { withCors, PlanTypeId, config as utilsConfig } from "@basestack/utils";
import { withUsageUpdate } from "server/db/utils/subscription";
// Prisma
import { prisma } from "server/db";
// Jobs
import {
  sendEmailEvent,
  sendDataToExternalWebhookEvent,
  checkDataForSpamEvent,
} from "libs/qstash";

const { hasFormPlanFeature, getFormLimitByKey } = utilsConfig.plans;

export enum FormMode {
  REST = "rest",
}

const cors = Cors({
  methods: ["POST"],
  origin: "*",
  optionsSuccessStatus: 200,
});

const defaultSuccessUrl = "/status/success";
const defaultErrorUrl = "/status/error";

const getFormOnUser = async (formId: string, referer: string) => {
  const current = await prisma.formOnUsers.findFirst({
    where: {
      formId: formId,
    },
    select: {
      form: {
        omit: {
          createdAt: true,
          updatedAt: true,
          id: true,
          rules: true,
        },
      },
      user: {
        select: {
          id: true,
          subscription: {
            select: {
              planId: true,
              submissions: true,
            },
          },
        },
      },
    },
  });

  if (!current) {
    return null;
  }

  return {
    ...current?.form,
    redirectUrl: current?.form.redirectUrl || referer,
    successUrl: current?.form.successUrl || defaultSuccessUrl,
    errorUrl: current?.form.errorUrl || defaultErrorUrl,
    userId: current?.user.id,
    usage: current?.user.subscription || {
      planId: PlanTypeId.FREE,
      submissions: 0,
    },
  };
};

const getMetadata = (req: Request) => {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const ip = requestIp.getClientIp({ headers } as any);

  return {
    ip,
    referer: req.headers.get("referer") || "/",
    userAgent: req.headers.get("user-agent") || "",
    acceptLanguage: req.headers.get("accept-language") || "",
  };
};

const handleError = (
  error: { message: string; url: string; code?: number },
  mode: string,
  referer: string = "/",
) => {
  const message = error.message || "Something went wrong";
  const url = error.url || referer;
  const errorUrl = `${url}&message=${encodeURI(message)}`;
  const code = error.code || 400;

  if (mode === FormMode.REST) {
    return Response.json(
      { error: true, code, message, url: errorUrl },
      { status: code },
    );
  }

  return Response.redirect(errorUrl, 307);
};

const formatFormData = async (
  req: Request,
  errorUrl: string,
  redirectUrl: string,
  referer: string = "/",
  mode: string,
  honeypot: string = "_trap",
) => {
  const url = `${errorUrl}?goBackUrl=${redirectUrl}`;

  const body = req.body;
  if (!body) {
    handleError(
      {
        url,
        message: "Error: No body found in the request",
      },
      mode,
      referer,
    );
    return null;
  }

  // @ts-ignore
  const nodeStream = Readable.from(body) as unknown as IncomingMessage;

  nodeStream.headers = Object.fromEntries(req.headers.entries());
  nodeStream.method = req.method || "POST";
  nodeStream.url = req.url || "/";

  const f = formidable({});
  const parseFormData = () =>
    new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
      (resolve, reject) => {
        f.parse(nodeStream, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      },
    );

  let fields: formidable.Fields, files: formidable.Files;

  try {
    ({ fields, files } = await parseFormData());
  } catch (error: any) {
    handleError(
      {
        url,
        message: `Error: Failed to parse form data - ${error.message}`,
      },
      mode,
      referer,
    );
    return null;
  }

  if (Object.keys(fields).length === 0) {
    handleError(
      {
        url,
        message: "Error: No fields found in the request",
      },
      mode,
      referer,
    );
    return null;
  }

  const { [honeypot]: _trap, ...data } = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  if (typeof _trap === "string" && _trap.trim() !== "") {
    handleError(
      {
        url,
        message: "Error: You are a bot!",
      },
      mode,
      referer,
    );
    return null;
  }

  return data;
};

const verifyForm = async (
  formId: string,
  referer: string,
  mode: string,
  metadata: { ip: string | null },
) => {
  if (!formId) {
    handleError(
      {
        url: `${defaultErrorUrl}?goBackUrl=${referer}`,
        message: "No formId found in the request",
      },
      mode,
      referer,
    );
    return;
  }

  const form = await getFormOnUser(formId, referer);

  if (!form) {
    handleError(
      {
        code: 404,
        url: `${defaultErrorUrl}?goBackUrl=${referer}`,
        message: "Error: No form found with the ID in the request",
      },
      mode,
      referer,
    );
    return;
  }

  if (form?.isEnabled) {
    const planId = form.usage.planId as PlanTypeId;

    if (form.usage.submissions >= getFormLimitByKey(planId, "submissions")) {
      handleError(
        {
          code: 403,
          url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
          message:
            "Error: Form submission limit exceeded. Please consider upgrading.",
        },
        mode,
        referer,
      );

      return;
    }

    if (!!form.websites && hasFormPlanFeature(planId, "hasWebsites")) {
      const websites = form.websites.split(",");
      const isValid = websites.some((website) => referer.includes(website));

      if (!isValid) {
        handleError(
          {
            code: 403,
            url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
            message: "Error: The website is not allowed to submit the form",
          },
          mode,
          referer,
        );

        return;
      }
    }

    if (
      !!form.blockIpAddresses &&
      metadata?.ip &&
      hasFormPlanFeature(planId, "hasBlockIPs")
    ) {
      const blockIpAddresses = form.blockIpAddresses.split(",");
      const isBlocked = blockIpAddresses.some((ip) => ip === metadata.ip);

      if (isBlocked) {
        handleError(
          {
            code: 403,
            url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
            message:
              "Error: Your IP address is blocked from submitting the form",
          },
          mode,
          referer,
        );
        return;
      }
    }
  }

  return form;
};

export async function POST(
  req: Request,
  { params }: { params: { formId: string } },
) {
  const referer = req.headers.get("referer") || "/";
  const { formId } = params;

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "";

  const metadata = getMetadata(req);

  try {
    const form = await verifyForm(formId, referer, mode, metadata);

    if (form?.isEnabled) {
      const planId = form.usage.planId as PlanTypeId;

      const data = await formatFormData(
        req,
        form.errorUrl,
        form.redirectUrl,
        referer,
        mode,
        form.honeypot ?? "",
      );

      if (data) {
        if (form?.hasRetention) {
          const submission = await prisma.$transaction(async (tx) => {
            const response = await tx.submission.create({
              data: {
                formId,
                data,
                metadata,
              },
              select: {
                id: true,
              },
            });

            await withUsageUpdate(tx, form.userId, "submissions", "increment");

            return response;
          });

          if (
            form.hasSpamProtection &&
            hasFormPlanFeature(planId, "hasSpamProtection")
          ) {
            await checkDataForSpamEvent({
              submissionId: submission.id,
              data,
            });
          }
        }

        if (!!form.webhookUrl && hasFormPlanFeature(planId, "hasWebhooks")) {
          await sendDataToExternalWebhookEvent({
            url: form.webhookUrl,
            body: {
              formId,
              name: form.name,
              data,
            },
          });
        }

        if (
          !!form.emails &&
          hasFormPlanFeature(planId, "hasEmailNotifications")
        ) {
          await sendEmailEvent({
            template: "new-submission",
            to: form.emails.split(",").map((email) => email.trim()),
            subject: `New form submission received for ${form.name}`,
            props: {
              formName: form.name,
              content: data,
              formId,
            },
          });
        }

        const queryString =
          form.hasDataQueryString &&
          hasFormPlanFeature(planId, "hasDataQueryString")
            ? `&data=${encodeURI(JSON.stringify(data))}`
            : "";

        const successUrl = `${form?.successUrl}?goBackUrl=${form?.redirectUrl}${queryString}`;

        if (mode === FormMode.REST) {
          return Response.json(
            {
              code: 200,
              success: true,
              message: "Your form has been submitted successfully!",
              url: successUrl,
            },
            { status: 200 },
          );
        }

        return Response.redirect(successUrl, 307);
      }
    } else {
      return handleError(
        {
          code: 409,
          url: `${form?.errorUrl}?goBackUrl=${form?.redirectUrl}`,
          message:
            "Error: The form is disabled and not able to accept submissions.",
        },
        mode,
        referer,
      );
    }
  } catch (error: any) {
    return handleError(error, mode, referer);
  }
}
