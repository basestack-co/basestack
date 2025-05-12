import { PrismaClient, Prisma } from ".prisma/client";
import { DefaultArgs } from ".prisma/client/runtime/library";
// tRPC
import { TRPCError } from "@trpc/server";
// Utils
import { config, FlagsPlan, PlanTypeId, Product } from "@basestack/utils";

export const getSubscriptionUsage = async (
  prisma: PrismaClient,
  userId: string
) => {
  try {
    const usage = await prisma.subscription.findFirstOrThrow({
      where: {
        userId,
      },
      omit: {
        userId: true,
        updatedAt: true,
        createdAt: true,
        scheduleId: true,
        event: true,
      },
    });

    return !!usage
      ? { ...usage }
      : {
          planId: PlanTypeId.FREE,
          subscriptionId: "",
          billingCycleStart: null,
          ...config.plans.getFlagsPlanLimitsDefaults(),
        };
  } catch {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};

export const withUsageUpdate = async (
  prisma:
    | PrismaClient
    | Omit<
        PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
        | "$connect"
        | "$disconnect"
        | "$on"
        | "$transaction"
        | "$use"
        | "$extends"
      >,
  userId: string,
  limit: keyof FlagsPlan["limits"],
  action: "increment" | "decrement",
  value: number = 1
) => {
  try {
    return await prisma.subscription.upsert({
      // Create a new subscription if it doesn't exist with the free plan
      create: {
        userId,
        planId: PlanTypeId.FREE,
        subscriptionId: "",
        billingCycleStart: new Date(),
        [limit]: 1,
      },
      // Increment or decrement the limit
      update: {
        [limit]: {
          [action]: value,
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
  limitKey: keyof FlagsPlan["limits"],
  count: number
) {
  return function <T extends (...args: any[]) => Promise<any>>(promise: T): T {
    return async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      if (!config.plans.isValidPlan(Product.FLAGS, planId)) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "Your current plan is not supported. Please upgrade to continue.",
          cause: "InvalidPlan",
        });
      }

      const limit = config.plans.getPlanLimitByKey(
        Product.FLAGS,
        planId,
        limitKey
      );

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
  feature: keyof FlagsPlan["features"] | null
) {
  return function <T extends (...args: any[]) => Promise<any>>(promise: T): T {
    return async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      if (!config.plans.isValidPlan(Product.FLAGS, planId)) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "Your current plan is not supported. Please upgrade to continue.",
          cause: "InvalidPlan",
        });
      }

      const hasFeature = feature
        ? config.plans.hasPlanFeature(Product.FLAGS, planId, feature)
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
