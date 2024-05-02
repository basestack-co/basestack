import { protectedProcedure, router } from "server/trpc";
// Types
import { PlanTypeId } from "@basestack/utils";
// Utils
import { z } from "zod";

export const subscriptionRouter = router({
  usage: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.prisma.usage.findFirst({
      where: {
        userId,
      },
      omit: {
        updatedAt: true,
        createdAt: true,
      },
    });
  }),
  create: protectedProcedure
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

      return ctx.prisma.usage.create({
        data: {
          userId,
          planId: input.planId,
          subscriptionId: input.subscriptionId,
          billingCycleStart: new Date(),
        },
      });
    }),
});
