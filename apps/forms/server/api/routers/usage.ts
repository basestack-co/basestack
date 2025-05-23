import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
// Utils
import { getUsage } from "server/db/utils/subscription";

export const usageRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id!;
    return await getUsage(ctx.prisma, userId);
  }),
});
