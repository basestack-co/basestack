import { Prisma, PrismaClient } from ".prisma/client";
import { DefaultArgs } from ".prisma/client/runtime/library";
// Utils
import { config, FormPlan, PlanTypeId, Product } from "@basestack/utils";
// tRPC
import { TRPCError } from "@trpc/server";

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
  limit: keyof FormPlan["limits"],
  action: "increment" | "decrement",
  value: number = 1,
) => {
  try {
    return await prisma.usage.upsert({
      // Create a new subscription if it doesn't exist with the free plan
      create: {
        userId,
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
  limitKey: keyof FormPlan["limits"],
  count: number,
) {
  return function <T extends (...args: any[]) => Promise<any>>(promise: T): T {
    return async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      if (!config.plans.isValidPlan(Product.FORMS, planId)) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "Your current plan is not supported. Please upgrade to continue.",
          cause: "InvalidPlan",
        });
      }

      const limit = config.plans.getLimitByKey(Product.FORMS, planId, limitKey);

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
  feature: keyof FormPlan["features"] | null,
) {
  return function <T extends (...args: any[]) => Promise<any>>(promise: T): T {
    return async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      if (!config.plans.isValidPlan(Product.FORMS, planId)) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "Your current plan is not supported. Please upgrade to continue.",
          cause: "InvalidPlan",
        });
      }

      const hasFeature = feature
        ? config.plans.hasPlanFeature(Product.FORMS, planId, feature)
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
