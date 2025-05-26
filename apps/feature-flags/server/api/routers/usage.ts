import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
// Utils
import { config } from "@basestack/utils";
// Polar
import { getCustomerSubscription } from "libs/polar/utils";

export const usageRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id!;

    const usage = await ctx.prisma.usage.findFirst({
      where: {
        userId,
      },
      omit: {
        userId: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    if (!usage) {
      return config.plans.getFlagsPlanLimitsDefaults();
    }

    return usage;
  }),
  subscription: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id!;

    const subscription = await getCustomerSubscription(userId);

    return subscription;
  }),
});
