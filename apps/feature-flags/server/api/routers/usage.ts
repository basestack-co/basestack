import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
// Utils
import { getUsage } from "server/db/utils/usage";

export const usageRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id!;

    return getUsage(ctx.prisma, userId);
  }),
});
