import { protectedProcedure, router } from "server/trpc";
// Utils
import { getSubscriptionUsage } from "libs/prisma/utils/subscription";
import { PlanTypeId } from "@basestack/utils";
import { z } from "zod";

export const subscriptionRouter = router({
  usage: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return await getSubscriptionUsage(ctx.prisma, userId);
  }),
  createOrUpdate: protectedProcedure
    .meta({
      restricted: false,
    })
    .input(
      z
        .object({
          planId: z.nativeEnum(PlanTypeId),
          subscriptionId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.subscription.upsert({
        create: {
          userId,
          planId: input.planId,
          subscriptionId: input.subscriptionId,
          billingCycleStart: new Date(),
        },
        update: {
          /* submissions: {
            increment: 1,
          }, */
        },
        where: {
          userId,
        },
      });
    }),
});
