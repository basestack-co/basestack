import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import { z } from "zod";

export const environmentRouter = createProtectedRouter()
  .query("all", {
    meta: {
      restricted: true,
    },
    input: z
      .object({
        projectSlug: z.string(),
      })
      .required(),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;

      return await ctx.prisma.project.findFirst({
        where: {
          slug: input.projectSlug,
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
        select: {
          environments: true,
        },
      });
    },
  })
  .mutation("create", {
    meta: {
      restricted: true,
    },
    input: z
      .object({
        name: z.string(),
        slug: z.string(),
        description: z.string(),
        projectId: z.string(),
      })
      .required(),
    resolve: async ({ ctx, input }) => {
      const environment = await ctx.prisma.environment.create({
        data: {
          name: input.name,
          slug: input.slug,
          description: input.description,
          project: {
            connect: {
              id: input.projectId,
            },
          },
        },
      });

      return { environment };
    },
  })
  .mutation("update", {
    meta: {
      restricted: true,
    },
    input: z
      .object({
        // this prop is used on the createProtectedRouter Middleware to validated user project permissions
        projectId: z.string(),
        environmentId: z.string(),
        name: z.string(),
        description: z.string(),
      })
      .required(),
    resolve: async ({ ctx, input }) => {
      const environment = await ctx.prisma.environment.update({
        where: {
          id: input.environmentId,
        },
        data: {
          name: input.name,
          description: input.description,
        },
      });

      return { environment };
    },
  })
  .mutation("delete", {
    meta: {
      restricted: true,
    },
    input: z
      .object({
        // this prop is used on the createProtectedRouter Middleware to validated user project permissions
        projectId: z.string(),
        environmentId: z.string(),
      })
      .required(),
    resolve: async ({ ctx, input }) => {
      const environment = await ctx.prisma.environment.delete({
        where: {
          id: input.environmentId,
        },
      });

      return { environment };
    },
  });
