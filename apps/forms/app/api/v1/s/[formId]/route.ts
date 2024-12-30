import { NextResponse } from "next/server";
// Utils
import formidable from "formidable";
import { Readable } from "stream";
import requestIp from "request-ip";
import { IncomingMessage } from "http";
import { PlanTypeId, config as utilsConfig } from "@basestack/utils";
import { withUsageUpdate } from "server/db/utils/subscription";
// Prisma
import { prisma } from "server/db";
// Jobs
import {
  sendEmailEvent,
  sendDataToExternalWebhookEvent,
  checkDataForSpamEvent,
} from "libs/qstash";

const { plans, urls } = utilsConfig;
const { hasFormPlanFeature, getFormLimitByKey } = plans;

export enum FormMode {
  REST = "rest",
}

const defaultSuccessUrl = `${urls.app.production.forms}/status/success`;
const defaultErrorUrl = `${urls.app.production.forms}/status/error`;

class FormError extends Error {
  code: number;
  url: string;

  constructor({
    code,
    url,
    message,
  }: {
    code: number;
    url: string;
    message: string;
  }) {
    super(message);
    this.code = code;
    this.url = url;

    this.name = "FormError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FormError);
    }
  }
}

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

const formatFormData = async (
  req: Request,
  errorUrl: string,
  redirectUrl: string,
  honeypot: string = "_trap",
) => {
  const url = `${errorUrl}?goBackUrl=${redirectUrl}`;

  const body = req.body;
  if (!body) {
    throw new FormError({
      code: 400,
      url,
      message: "Error: No body found in the request",
    });
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
    throw new FormError({
      code: 400,
      url,
      message: `Error: Failed to parse form data - ${error.message}`,
    });
  }

  if (Object.keys(fields).length === 0) {
    throw new FormError({
      code: 400,
      url,
      message: "Error: No fields found in the request",
    });
  }

  const { [honeypot]: _trap, ...data } = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  if (typeof _trap === "string" && _trap.trim() !== "") {
    throw new FormError({
      code: 403,
      url,
      message: "Error: You are a bot!",
    });
  }

  return data;
};

const verifyForm = async (
  formId: string,
  referer: string,
  metadata: { ip: string | null },
) => {
  if (!formId) {
    throw new FormError({
      code: 404,
      url: `${defaultErrorUrl}?goBackUrl=${referer}`,
      message: "No formId found in the request",
    });
  }

  const form = await getFormOnUser(formId, referer);

  if (!form) {
    throw new FormError({
      code: 404,
      url: `${defaultErrorUrl}?goBackUrl=${referer}`,
      message: "Error: No form found with the ID in the request",
    });
  }

  if (form?.isEnabled) {
    const planId = form.usage.planId as PlanTypeId;

    if (form.usage.submissions >= getFormLimitByKey(planId, "submissions")) {
      throw new FormError({
        code: 403,
        url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
        message:
          "Error: Form submission limit exceeded. Please consider upgrading.",
      });
    }

    if (!!form.websites && hasFormPlanFeature(planId, "hasWebsites")) {
      const websites = form.websites.split(",");
      const isValid = websites.some((website) => referer.includes(website));

      if (!isValid) {
        throw new FormError({
          code: 403,
          url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
          message: "Error: The website is not allowed to submit the form",
        });
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
        throw new FormError({
          code: 403,
          url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
          message: "Error: Your IP address is blocked from submitting the form",
        });
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
  const { formId } = await params;

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "";

  const metadata = getMetadata(req);

  try {
    const form = await verifyForm(formId, referer, metadata);

    if (form?.isEnabled) {
      const planId = form.usage.planId as PlanTypeId;

      const data = await formatFormData(
        req,
        form.errorUrl,
        form.redirectUrl,
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
      throw new FormError({
        code: 409,
        url: `${form?.errorUrl}?goBackUrl=${form?.redirectUrl}`,
        message:
          "Error: The form is disabled and not able to accept submissions.",
      });
    }
  } catch (error) {
    if (error instanceof FormError) {
      if (mode === FormMode.REST) {
        return NextResponse.json(
          {
            error: true,
            code: error.code,
            message: error.message,
            url: error.url,
          },
          { status: error.code },
        );
      } else {
        return NextResponse.redirect(error.url, 307);
      }
    } else {
      return NextResponse.json(
        { error: true, message: "An unexpected error occurred." },
        { status: 500 },
      );
    }
  }
}
