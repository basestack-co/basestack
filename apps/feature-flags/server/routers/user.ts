import { protectedProcedure, router } from "server/trpc";
// Utils
import {
  AllUserInput,
  UserByProjectIdInput,
  UserBySearchInput,
} from "../schemas/user";

export const userRouter = router({
  all: protectedProcedure.input(AllUserInput).query(async ({ ctx, input }) => {
    const users = await ctx.prisma.user.findMany({
      where: {
        NOT: {
          projects: {
            some: {
              projectId: input.projectId,
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
  byProjectId: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(UserByProjectIdInput)
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.projectsOnUsers.findMany({
        where: {
          projectId: input.projectId,
        },
        select: {
          userId: true,
          projectId: true,
          role: true,
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
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
