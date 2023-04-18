import { protectedProcedure, router } from "server/trpc";
// Utils
import { generateSlug } from "random-word-slugs";
// Inputs
import schemas from "server/schemas";
import { updateMember } from "../schemas/project";

export const projectRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const projects = await ctx.prisma.project.findMany({
      where: {
        users: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { projects };
  }),
  bySlug: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.project.input.BySlug)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return await ctx.prisma.$transaction(async (tx) => {
        const project = await tx.project.findUnique({
          where: {
            slug: input.projectSlug,
          },
        });

        const role = await tx.projectsOnUsers.findFirst({
          where: {
            projectId: project?.id,
            userId,
          },
          select: {
            role: true,
          },
        });

        return {
          project: {
            ...project,
            role: role?.role,
          },
        };
      });
    }),
  allKeys: protectedProcedure
    .input(schemas.project.input.allKeys)
    .query(async ({ ctx, input }) => {
      const keys = await ctx.prisma.project.findUnique({
        where: {
          slug: input.projectSlug,
        },
        select: {
          key: true,
          environments: {
            select: {
              id: true,
              name: true,
              key: true,
            },
          },
        },
      });

      return { keys };
    }),
  members: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.project.input.members)
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
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return { users };
    }),
  create: protectedProcedure
    .input(schemas.project.input.create)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return await ctx.prisma.$transaction(async (tx) => {
        const project = await tx.project.create({
          data: {
            ...input,
            slug: `${input.slug}`,
            environments: {
              create: [
                {
                  name: "develop",
                  slug: `${generateSlug()}`,
                  description: "The default develop environment",
                  isDefault: true,
                },
                {
                  name: "staging",
                  slug: `${generateSlug()}`,
                  description: "The default staging environment",
                },
                {
                  name: "production",
                  slug: `${generateSlug()}`,
                  description: "The default production environment",
                },
              ],
            },
          },
        });

        const connection = await tx.projectsOnUsers.create({
          data: {
            project: {
              connect: {
                id: project.id,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return { project, connection };
      });
    }),
  update: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.project.input.update)
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.update({
        where: {
          id: input.projectId,
        },
        data: {
          name: input.name,
        },
      });
      return { project };
    }),
  delete: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.project.input.delete)
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.delete({
        where: {
          id: input.projectId,
        },
      });

      return { project };
    }),
  addMember: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.project.input.addMember)
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
  updateMember: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.project.input.updateMember)
    .mutation(async ({ ctx, input }) => {
      const connection = await ctx.prisma.projectsOnUsers.update({
        where: {
          projectId_userId: {
            projectId: input.projectId,
            userId: input.userId,
          },
        },
        data: {
          role: input.role,
        },
        select: {
          role: true,
        },
      });

      return { connection };
    }),
  removeMember: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.project.input.removeMember)
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
