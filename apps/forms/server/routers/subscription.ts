import { protectedProcedure, router } from "server/trpc";
// Utils
import { PlanTypeId, config } from "@basestack/utils";
import { z } from "zod";

export const subscriptionRouter = router({
  usage: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const usage = await ctx.prisma.subscription.findFirst({
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
