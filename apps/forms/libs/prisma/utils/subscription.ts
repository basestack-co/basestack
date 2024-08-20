// tRPC
import { TRPCError } from "@trpc/server";
// Utils
import { config, Plan, PlanTypeId } from "@basestack/utils";
// Types
import { PrismaClientType } from "..";

export const getSubscriptionUsage = async (
  prisma: PrismaClientType,
  userId: string,
) => {
  try {
    const usage = await prisma.subscription.findFirst({
      where: {
        userId,
      },
      omit: {
        userId: true,
        updatedAt: true,
        createdAt: true,
        billingCycleStart: true,
        scheduleId: true,
        event: true,
      },
      cacheStrategy: { swr: 60, ttl: 60 },
    });

    return !!usage
      ? { ...usage }
      : {
          planId: PlanTypeId.FREE,
          subscriptionId: "",
          forms: 0,
          members: 0,
          ...config.plans.getFormPlanLimitsDefaults(),
        };
  } catch {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};

export const withUsageUpdate = async (
  prisma: PrismaClientType | any,
  userId: string,
  limit: keyof Plan["limits"],
  action: "increment" | "decrement",
) => {
  try {
    return await prisma.subscription.upsert({
      // Create a new subscription if it doesn't exist with the free plan
      create: {
        userId,
        // TODO: This is a temporary solution until we have a proper subscription system
        planId: PlanTypeId.PREVIEW,
        subscriptionId: "",
        billingCycleStart: new Date(),
        [limit]: 1,
      },
      // Increment or decrement the limit
      update: {
        [limit]: {
          [action]: 1,
        },
      },
      where: {
        userId,
      },
    });
  } catch {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};

export function withLimits(
  planId: PlanTypeId,
  limitKey: keyof Plan["limits"],
  count: number,
) {
  return function <T extends (...args: any[]) => Promise<any>>(promise: T): T {
    return async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      const limit = config.plans.getFormLimitByKey(planId, limitKey);

      if (count < limit) {
        return promise.apply(this, args);
      } else {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Plan limit exceeded. Please consider upgrading.",
          cause: "LimitExceeded",
        });
      }
    } as T;
  };
}

export function withFeatures(
  planId: PlanTypeId,
  feature: keyof Plan["features"] | null,
) {
  return function <T extends (...args: any[]) => Promise<any>>(promise: T): T {
    return async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      const hasFeature = feature
        ? config.plans.hasFormPlanFeature(planId, feature)
        : true;

      if (hasFeature) {
        return promise.apply(this, args);
      } else {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "This feature is not included in your current plan. Please consider upgrading.",
          cause: "FeatureNotAvailable",
        });
      }
    } as T;
  };
}
