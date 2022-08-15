import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import { generateSlug } from "random-word-slugs";
import * as yup from "yup";

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
  .query("byId", {
    input: yup.object({
      projectId: yup.string().required(),
    }),
    async resolve({ ctx, input }) {
      const project = await ctx.prisma.project.findUnique({
        where: {
          id: input.projectId,
        },
      });
      return { project };
    },
  })
  .mutation("create", {
    input: yup.object({
      name: yup.string().required(),
      slug: yup.string().required(),
    }),
    resolve: async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const project = await ctx.prisma.project.create({
        data: {
          ...input,
          slug: `pr-${input.slug}`,
        },
      });

      /* const connection = await ctx.prisma.projectsOnUsers.create({
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
                        }); */

      const [connection] = await ctx.prisma.$transaction([
        ctx.prisma.projectsOnUsers.create({
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
        }),
        ctx.prisma.environment.create({
          data: {
            name: "develop",
            slug: `env-${generateSlug()}`,
            description: "The default environment",
            project: {
              connect: {
                id: project.id,
              },
            },
          },
        }),
      ]);

      return { project, connection };
    },
  })
  .mutation("update", {
    meta: {
      restricted: true,
    },
    input: yup.object({
      projectId: yup.string().required(),
      name: yup.string().required(),
    }),
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
    input: yup.object({
      projectId: yup.string().required(),
    }),
    resolve: async ({ ctx, input }) => {
      const project = await ctx.prisma.project.delete({
        where: {
          id: input.projectId,
        },
      });

      return { project };
    },
  });
