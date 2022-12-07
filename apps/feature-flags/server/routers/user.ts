import { protectedProcedure, router } from "server/trpc";
// Utils
import { UserByProjectIdInput, UserBySearchInput } from "../schemas/user";

export const userRouter = router({
  byProjectId: protectedProcedure
    .input(UserByProjectIdInput)
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.user.findMany({
        where: {
          projects: {
            some: {
              project: {
                id: input.projectId,
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return { users };
    }),
  bySearch: protectedProcedure
    .input(UserBySearchInput)
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.user.findMany({
        where: {
          name: {
            search: input.search,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return { users };
    }),
});
