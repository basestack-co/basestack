import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
// Utils
import { config } from "@basestack/utils";
// Polar
import { polar } from "@basestack/vendors";

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

    const subscription = await polar.getCustomerSubscription(userId);

    return subscription;
  }),
});
