// Utils
import formidable from "formidable";
import { Readable } from "stream";
import requestIp from "request-ip";
import { IncomingMessage } from "http";
import { PlanTypeId, config as utilsConfig } from "@basestack/utils";
// Prisma
import { getFormOnUser, defaultErrorUrl } from "server/db/utils/form";
const { hasFormPlanFeature, getFormLimitByKey } = utilsConfig.plans;

export enum FormMode {
  REST = "rest",
}

export class FormError extends Error {
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

export const getMetadata = (req: Request) => {
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

export const formatFormData = async (
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

export const verifyForm = async (
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
