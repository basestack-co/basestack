// import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import { z } from "zod";

export const userRouter = createProtectedRouter()
  .query("byProjectId", {
    input: z
      .object({
        projectId: z.string(),
      })
      .required(),
    async resolve({ ctx, input }) {
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
    },
  })
  .query("bySearch", {
    input: z
      .object({
        projectId: z.string(),
        search: z.string(),
      })
      .required(),
    async resolve({ ctx, input }) {
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
    },
  });
