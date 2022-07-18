// import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import * as yup from "yup";

export const userRouter = createProtectedRouter()
  .query("byProjectId", {
    input: yup.object({
      projectId: yup.string().required(),
    }),
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
    input: yup.object({
      projectId: yup.string().required(),
      search: yup.string(),
    }),
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
