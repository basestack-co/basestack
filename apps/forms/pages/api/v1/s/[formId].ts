import type { NextApiRequest, NextApiResponse } from "next";
// Utils
import formidable from "formidable";
import requestIp from "request-ip";
import Cors from "cors";
import { withCors, PlanTypeId, config as utilsConfig } from "@basestack/utils";
import { withUsageUpdate } from "libs/prisma/utils/subscription";
// Prisma
import prisma from "libs/prisma";
// Jobs
import { triggerClient, TriggerEventName } from "libs/trigger";

const { hasFormPlanFeature, getFormLimitByKey } = utilsConfig.plans;

const defaultSuccessUrl = "/form/status/success";
const defaultErrorUrl = "/form/status/error";

export enum FormMode {
  REST = "rest",
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// More at https://github.com/expressjs/cors
const cors = Cors({
  methods: ["POST"],
  origin: "*",
  optionsSuccessStatus: 200,
});

const handleError = (
  res: NextApiResponse,
  error: { message: string; url: string; code?: number },
  mode: string,
  referer: string = "/",
) => {
  const message = error.message || "Something went wrong";
  const url = error.url || referer;
  const errorUrl = `${url}&message=${encodeURI(message)}`;
  const code = error.code || 400;

  return mode === FormMode.REST
    ? res.status(code).json({ error: true, code, message, url: errorUrl })
    : res.redirect(307, errorUrl);
};

const formatFormData = async (
  req: NextApiRequest,
  res: NextApiResponse,
  errorUrl: string,
  redirectUrl: string,
  referer: string = "/",
  mode: string,
  honeypot: string = "_trap",
) => {
  const f = formidable({});
  const [fields, files] = await f.parse(req);
  const url = `${errorUrl}?goBackUrl=${redirectUrl}`;

  // If there are no fields in the request, throw an error
  if (Object.keys(fields).length === 0) {
    handleError(
      res,
      {
        url,
        message: "Error: No fields found in the request",
      },
      mode,
      referer,
    );

    return null;
  }

  // Extract data excluding the honeypot field
  const { [honeypot]: _trap, ...data } = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  // Check if _trap has a non-empty value
  if (typeof _trap === "string" && _trap.trim() !== "") {
    handleError(
      res,
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

const getMetadata = (req: NextApiRequest) => {
  const ip = requestIp.getClientIp(req);

  return {
    ip,
    referer: req.headers.referer || "/",
    userAgent: req.headers["user-agent"] || "",
    acceptLanguage: req.headers["accept-language"] || "",
  };
};

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

const verifyForm = async (
  res: NextApiResponse,
  formId: string,
  referer: string,
  mode: string,
  metadata: { ip: string | null },
) => {
  // If there is no formId in the request, throw an error
  if (!formId) {
    handleError(
      res,
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

  // If there is no form found with the ID in the request, throw an error
  if (!form) {
    handleError(
      res,
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
        res,
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
          res,
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
          res,
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const referer = req.headers.referer || "/";
    const { formId, mode } = req.query as { formId: string; mode: string };
    const metadata = getMetadata(req);

    try {
      const form = await verifyForm(res, formId, referer, mode, metadata);

      if (form?.isEnabled) {
        const planId = form.usage.planId as PlanTypeId;

        const data = await formatFormData(
          req,
          res,
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

              await withUsageUpdate(
                tx,
                form.userId,
                "submissions",
                "increment",
              );

              return response;
            });

            if (
              form.hasSpamProtection &&
              hasFormPlanFeature(planId, "hasSpamProtection")
            ) {
              await triggerClient.sendEvent({
                name: TriggerEventName.CHECK_DATA_FOR_SPAM,
                payload: {
                  submissionId: submission.id,
                  data,
                },
              });
            }
          }

          if (!!form.webhookUrl && hasFormPlanFeature(planId, "hasWebhooks")) {
            await triggerClient.sendEvent({
              name: TriggerEventName.SEND_DATA_TO_EXTERNAL_WEBHOOK,
              payload: {
                url: form.webhookUrl,
                body: {
                  formId,
                  name: form.name,
                  data,
                },
              },
            });
          }

          if (
            !!form.emails &&
            hasFormPlanFeature(planId, "hasEmailNotifications")
          ) {
            await triggerClient.sendEvent({
              name: TriggerEventName.SEND_EMAIL,
              payload: {
                template: "new-submission",
                to: form.emails.split(",").map((email) => email.trim()),
                subject: `New form submission received for ${form.name}`,
                props: {
                  formName: form.name,
                  content: data,
                  formId,
                },
              },
            });
          }

          const queryString =
            form.hasDataQueryString &&
            hasFormPlanFeature(planId, "hasDataQueryString")
              ? `&data=${encodeURI(JSON.stringify(data))}`
              : "";

          const successUrl = `${form?.successUrl}?goBackUrl=${form?.redirectUrl}${queryString}`;

          return mode === FormMode.REST
            ? res.status(200).json({
                code: 200,
                success: true,
                message: "Your form has been submitted successfully!",
                url: successUrl,
              })
            : res.redirect(307, successUrl);
        }
      } else {
        return handleError(
          res,
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
      return handleError(res, error, mode, referer);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      code: 405,
      error: true,
      message: `The HTTP method is not supported at this route.`,
    });
  }
};

export default withCors(cors, handler);
