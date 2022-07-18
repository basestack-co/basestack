import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import * as yup from "yup";
import { getValue } from "@basestack/utils";

export const environmentRouter = createProtectedRouter()
  .query("all", {
    meta: {
      restricted: true,
    },
    input: yup.object({
      projectId: yup.string().required(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;

      const environments = await ctx.prisma.project.findFirst({
        where: {
          id: input.projectId,
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

      return { environments: getValue(environments, "environments", []) };
    },
  })
  .mutation("create", {
    meta: {
      restricted: true,
    },
    input: yup.object({
      name: yup.string().required(),
      slug: yup.string().required(),
      description: yup.string().required(),
      projectId: yup.string().required(),
    }),
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
    input: yup.object({
      // this prop is used on the createProtectedRouter Middleware to validated user project permissions
      projectId: yup.string().required(),
      environmentId: yup.string().required(),
      name: yup.string().required(),
      description: yup.string().required(),
    }),
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
    input: yup.object({
      // this prop is used on the createProtectedRouter Middleware to validated user project permissions
      projectId: yup.string().required(),
      environmentId: yup.string().required(),
    }),
    resolve: async ({ ctx, input }) => {
      const environment = await ctx.prisma.environment.delete({
        where: {
          id: input.environmentId,
        },
      });

      return { environment };
    },
  });
