import { PrismaClient } from "@prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";
// Utils
import { PlanTypeId, config } from "@basestack/utils";

export const getSubscriptionUsage = async (
  prisma: PrismaClient,
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
      },
    });

    return !!usage
      ? { ...usage }
      : {
          planId: PlanTypeId.FREE,
          subscriptionId: "",
          ...config.plans.getFormPlanLimits(PlanTypeId.FREE),
        };
  } catch {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};
