import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import { generateSlug } from "random-word-slugs";
import {
  CreateProjectInput,
  DeleteProjectInput,
  ProjectBySlugInput,
  UpdateProjectInput,
} from "../schemas/project";

export const projectRouter = createProtectedRouter()
  .query("all", {
    async resolve({ ctx }) {
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
    },
  })
  .query("bySlug", {
    input: ProjectBySlugInput,
    async resolve({ ctx, input }) {
      const project = await ctx.prisma.project.findUnique({
        where: {
          slug: input.projectSlug,
        },
      });
      return { project };
    },
  })
  .mutation("create", {
    input: CreateProjectInput,
    resolve: async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const project = await ctx.prisma.project.create({
        data: {
          ...input,
          slug: `pr-${input.slug}`,
          environments: {
            create: [
              {
                name: "develop",
                slug: `env-${generateSlug()}`,
                description: "The default develop environment",
              },
              {
                name: "staging",
                slug: `env-${generateSlug()}`,
                description: "The default staging environment",
              },
              {
                name: "production",
                slug: `env-${generateSlug()}`,
                description: "The default production environment",
              },
            ],
          },
        },
      });

      const connection = await ctx.prisma.projectsOnUsers.create({
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
    },
  })
  .mutation("update", {
    meta: {
      restricted: true,
    },
    input: UpdateProjectInput,
    resolve: async ({ ctx, input }) => {
      const project = await ctx.prisma.project.update({
        where: {
          id: input.projectId,
        },
        data: {
          name: input.name,
        },
      });
      return { project };
    },
  })
  .mutation("delete", {
    meta: {
      restricted: true,
    },
    input: DeleteProjectInput,
    resolve: async ({ ctx, input }) => {
      const project = await ctx.prisma.project.delete({
        where: {
          id: input.projectId,
        },
      });

      return { project };
    },
  });
