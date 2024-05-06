import { protectedProcedure, router } from "server/trpc";
// Utils
import { getSubscriptionUsage } from "libs/prisma/utils/subscription";

export const subscriptionRouter = router({
  usage: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return await getSubscriptionUsage(ctx.prisma, userId);
  }),
});
