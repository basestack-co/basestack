// Utils
import {
  PlanTypeId,
  config as utilsConfig,
  config,
  isRefererValid,
  getValidWebsite,
  isValidIpAddress,
  RequestError,
} from "@basestack/utils";
// DB
import { prisma } from "server/db";
import { getProjectOnUser, productUrl } from "server/db/utils/project";
import { withUsageUpdate } from "server/db/utils/subscription";

const { hasFlagsPlanFeature } = utilsConfig.plans;

export const verifyRequest = async (
  key: string,
  referer: string,
  metadata: { ip: string | null },
) => {
  try {
    const projectKey = key.trim();

    const project = await getProjectOnUser(projectKey);

    if (!project) {
      console.info(`"Error: No project found with the ID in the request`, {
        product: "Feature Flags",
        referer,
      });

      throw new RequestError({
        code: 404,
        url: productUrl,
        message: "Error: No project found",
      });
    }

    const planId = project.usage.planId as PlanTypeId;

    if (
      !!project.websites &&
      hasFlagsPlanFeature(planId, "hasWebsites") &&
      isRefererValid(referer)
    ) {
      const isValid = getValidWebsite(referer, project.websites);

      if (!isValid) {
        console.info(
          `"Error: The website is not allowed to fetch feature flags`,
          {
            product: "Feature Flags",
            referer,
          },
        );

        throw new RequestError({
          code: 403,
          url: productUrl,
          message: "Unauthorized request",
        });
      }
    }

    if (
      !!project.blockIpAddresses &&
      metadata?.ip &&
      hasFlagsPlanFeature(planId, "hasBlockIPs")
    ) {
      const blockIpAddresses = project.blockIpAddresses
        .split(",")
        .map((ip) => ip.trim())
        .filter(Boolean)
        .filter(isValidIpAddress);

      const clientIp = metadata.ip.trim();

      if (clientIp && isValidIpAddress(clientIp)) {
        const isBlocked = blockIpAddresses.some((ip) => ip === clientIp);

        if (isBlocked) {
          console.info(
            `Error: Your IP address is blocked from fetching feature flags`,
            {
              product: "Feature Flags",
              referer,
            },
          );

          throw new RequestError({
            code: 403,
            url: productUrl,
            message: "Access denied",
          });
        }
      }
    }

    const limit = config.plans.getFlagsLimitByKey(planId, "apiRequests");

    if (project.usage.apiRequests >= limit) {
      console.info(
        `Error: Plan limit exceeded for API requests. Please consider upgrading.`,
        {
          product: "Feature Flags",
          referer,
        },
      );

      throw new RequestError({
        code: 429,
        url: productUrl,
        message: "Rate limit exceeded",
      });
    }

    await withUsageUpdate(prisma, project.userId, "apiRequests", "increment");

    return true;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      console.error("Unexpected error in verifyRequest:", error);
      throw new RequestError({
        code: 500,
        url: productUrl,
        message: "An internal error occurred",
      });
    }

    throw error;
  }
};
