// import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import { UserByProjectIdInput, UserBySearchInput } from "../schemas/user";

export const userRouter = createProtectedRouter()
  .query("byProjectId", {
    input: UserByProjectIdInput,
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
    input: UserBySearchInput,
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
