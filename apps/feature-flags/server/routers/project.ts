import { protectedProcedure, router } from "server/trpc";
// Utils
import { generateSlug } from "random-word-slugs";
// Inputs
import schemas from "server/schemas";

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
    .input(schemas.project.input.BySlug)
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: {
          slug: input.projectSlug,
        },
      });
      return { project };
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
});
