import { protectedProcedure, router } from "server/trpc";
// Inputs
import schemas from "server/schemas";

export const userRouter = router({
  all: protectedProcedure
    .input(schemas.user.input.all)
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.user.findMany({
        where: {
          NOT: {
            projects: {
              some: {
                projectId: input.excludeProjectId,
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
    .input(schemas.user.input.bySearch)
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.user.findMany({
        where: {
          name: {
            search: input.search,
          },
          email: {
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
