// Utils
import requestIp from "request-ip";
import { PlanTypeId, config as utilsConfig, config } from "@basestack/utils";
// DB
import { prisma } from "server/db";
import { getProjectOnUser, productUrl } from "server/db/utils/project";
import { withUsageUpdate } from "server/db/utils/subscription";

const { hasFlagsPlanFeature } = utilsConfig.plans;

export class RequestError extends Error {
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

    this.name = "RequestError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError);
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

export const verifyRequest = async (
  projectKey: string,
  referer: string,
  metadata: { ip: string | null },
) => {
  const project = await getProjectOnUser(projectKey, referer);

  if (!project) {
    throw new RequestError({
      code: 404,
      url: productUrl,
      message: "Error: No project found with the ID in the request",
    });
  }

  const planId = project.usage.planId as PlanTypeId;

  if (!!project.websites && hasFlagsPlanFeature(planId, "hasWebsites")) {
    const websites = project.websites.split(",");
    const isValid = websites.some((website) => referer.includes(website));

    if (!isValid) {
      throw new RequestError({
        code: 403,
        url: productUrl,
        message: "Error: The website is not allowed to fetch feature flags",
      });
    }
  }

  if (
    !!project.blockIpAddresses &&
    metadata?.ip &&
    hasFlagsPlanFeature(planId, "hasBlockIPs")
  ) {
    const blockIpAddresses = project.blockIpAddresses.split(",");
    const isBlocked = blockIpAddresses.some((ip) => ip === metadata.ip);

    if (isBlocked) {
      throw new RequestError({
        code: 403,
        url: productUrl,
        message:
          "Error: Your IP address is blocked from fetching feature flags",
      });
    }
  }

  const limit = config.plans.getFlagsLimitByKey(planId, "apiRequests");

  if (project.usage.apiRequests >= limit) {
    throw new RequestError({
      code: 429,
      url: productUrl,
      message:
        "Error: Plan limit exceeded for API requests. Please consider upgrading.",
    });
  }

  await withUsageUpdate(prisma, project.userId, "apiRequests", "increment");

  return true;
};
