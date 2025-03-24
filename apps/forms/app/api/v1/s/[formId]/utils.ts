// Utils
import formidable from "formidable";
import { Readable } from "stream";
import { IncomingMessage } from "http";
import {
  PlanTypeId,
  config as utilsConfig,
  RequestError,
  getValidWebsite,
  isValidIpAddress,
  isRefererValid,
} from "@basestack/utils";
// Prisma
import { getFormOnUser, defaultErrorUrl } from "server/db/utils/form";

const { hasFormPlanFeature, getFormLimitByKey } = utilsConfig.plans;

export enum FormMode {
  REST = "rest",
}

export const formatFormData = async (
  req: Request,
  errorUrl: string,
  redirectUrl: string,
  honeypot: string = "_trap",
) => {
  const url = `${errorUrl}?goBackUrl=${redirectUrl}`;

  const body = req.body;
  if (!body) {
    throw new RequestError({
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
    throw new RequestError({
      code: 400,
      url,
      message: `Error: Failed to parse form data - ${error.message}`,
    });
  }

  if (Object.keys(fields).length === 0) {
    throw new RequestError({
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
    throw new RequestError({
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
  try {
    if (!formId) {
      throw new RequestError({
        code: 404,
        url: `${defaultErrorUrl}?goBackUrl=${referer}`,
        message: "No formId found in the request",
      });
    }

    const form = await getFormOnUser(formId, referer);

    if (!form) {
      throw new RequestError({
        code: 404,
        url: `${defaultErrorUrl}?goBackUrl=${referer}`,
        message: "Error: No form found with the ID in the request",
      });
    }

    if (form?.isEnabled) {
      const planId = form.usage.planId as PlanTypeId;

      if (form.usage.submissions >= getFormLimitByKey(planId, "submissions")) {
        throw new RequestError({
          code: 403,
          url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
          message:
            "Error: Form submission limit exceeded. Please consider upgrading.",
        });
      }

      if (
        !!form.websites &&
        hasFormPlanFeature(planId, "hasWebsites") &&
        isRefererValid(referer)
      ) {
        const isValid = getValidWebsite(referer, form.websites);

        if (!isValid) {
          throw new RequestError({
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
        const blockIpAddresses = form.blockIpAddresses
          .split(",")
          .map((ip) => ip.trim())
          .filter(Boolean)
          .filter(isValidIpAddress);

        const clientIp = metadata.ip.trim();

        if (clientIp && isValidIpAddress(clientIp)) {
          const isBlocked = blockIpAddresses.some((ip) => ip === clientIp);

          if (isBlocked) {
            throw new RequestError({
              code: 403,
              url: `${form.errorUrl}?goBackUrl=${form.redirectUrl}`,
              message:
                "Error: Your IP address is blocked from submitting the form",
            });
          }
        }
      }
    }

    return form;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      console.error("Unexpected error in verifyForm:", error, {
        formId,
        referer,
        ip: metadata?.ip,
      });

      throw new RequestError({
        code: 500,
        url: `${defaultErrorUrl}?goBackUrl=${referer}`,
        message: "An internal error occurred",
      });
    }

    throw error;
  }
};
