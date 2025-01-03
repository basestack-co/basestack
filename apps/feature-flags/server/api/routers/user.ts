import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
// Utils
import { z } from "zod";

export const userRouter = createTRPCRouter({
  all: protectedProcedure
    .input(
      z
        .object({
          excludeProjectId: z.string(),
        })
        .required(),
    )
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
    .input(
      z
        .object({
          projectId: z.string(),
          search: z.string(),
        })
        .required(),
    )
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
