import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import { generateSlug } from "random-word-slugs";
import { z } from "zod";

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
    input: z
      .object({
        projectSlug: z.string(),
      })
      .required(),
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
    input: z
      .object({
        name: z.string(),
        slug: z.string(),
      })
      .required(),
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
    input: z
      .object({
        projectId: z.string(),
        name: z.string(),
      })
      .required(),
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
    input: z
      .object({
        projectId: z.string(),
      })
      .required(),
    resolve: async ({ ctx, input }) => {
      const project = await ctx.prisma.project.delete({
        where: {
          id: input.projectId,
        },
      });

      return { project };
    },
  });
