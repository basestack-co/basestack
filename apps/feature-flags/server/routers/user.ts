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
  byProjectId: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.user.input.byProjectId)
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
  addToProject: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.user.input.addUserToProject)
    .mutation(async ({ ctx, input }) => {
      const connection = await ctx.prisma.projectsOnUsers.create({
        data: {
          project: {
            connect: {
              id: input.projectId,
            },
          },
          user: {
            connect: {
              id: input.userId,
            },
          },
          role: "USER",
        },
      });

      return { connection };
    }),
  removeFromProject: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.user.input.removeUserFromProject)
    .mutation(async ({ ctx, input }) => {
      const connection = await ctx.prisma.projectsOnUsers.delete({
        where: {
          projectId_userId: {
            projectId: input.projectId,
            userId: input.userId,
          },
        },
      });

      return { connection };
    }),
});
