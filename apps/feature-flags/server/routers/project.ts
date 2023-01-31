import { protectedProcedure, router } from "server/trpc";
// Utils
import { generateSlug } from "random-word-slugs";
import {
  CreateProjectInput,
  DeleteProjectInput,
  ProjectBySlugInput,
  UpdateProjectInput,
} from "../schemas/project";

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
    .input(ProjectBySlugInput)
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: {
          slug: input.projectSlug,
        },
      });
      return { project };
    }),
  create: protectedProcedure
    .input(CreateProjectInput)
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
    .input(UpdateProjectInput)
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
    .input(DeleteProjectInput)
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.delete({
        where: {
          id: input.projectId,
        },
      });

      return { project };
    }),
});
