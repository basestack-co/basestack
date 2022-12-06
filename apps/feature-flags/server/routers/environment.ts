import { createProtectedRouter } from "server/createProtectedRouter";
import { protectedProcedure, router } from "server/trpc";
// Utils
import { generateSlug } from "random-word-slugs";
import {
  AllEnvironmentInput,
  CreateEnvironmentInput,
  DeleteEnvironmentInput,
  UpdateEnvironmentInput,
} from "../schemas/environment";

export const environmentRouter = router({
  all: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(AllEnvironmentInput)
    .query(async ({ ctx, input }) => {
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
    }),
  create: protectedProcedure
    .input(CreateEnvironmentInput)
    .meta({
      restricted: true,
    })
    .mutation(async ({ ctx, input }) => {
      // Get all the flags from a selected environment
      const flagsFromEnv = await ctx.prisma.flag.findMany({
        where: {
          environmentId: input.copyFromEnvId,
        },
      });

      // Format the flags to be created in the new environment
      const flags = flagsFromEnv.map((flag) => ({
        slug: flag.slug,
        payload: flag.payload ?? {},
        expiredAt: flag.expiredAt,
        description: flag.description,
      }));

      const environment = await ctx.prisma.environment.create({
        data: {
          name: input.name,
          slug: generateSlug(),
          description: input.description,
          project: {
            connect: {
              id: input.projectId,
            },
          },
          flags: {
            create: flags,
          },
        },
      });

      return { environment };
    }),
  update: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(UpdateEnvironmentInput)
    .mutation(async ({ ctx, input }) => {
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
    }),
  delete: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(DeleteEnvironmentInput)
    .mutation(async ({ ctx, input }) => {
      const environment = await ctx.prisma.environment.delete({
        where: {
          id: input.environmentId,
        },
      });

      return { environment };
    }),
});

/* export const environmentRouter = createProtectedRouter()
  .query("all", {
    meta: {
      restricted: true,
    },
    input: AllEnvironmentInput,
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
    input: CreateEnvironmentInput,
    resolve: async ({ ctx, input }) => {
      // Get all the flags from a selected environment
      const flagsFromEnv = await ctx.prisma.flag.findMany({
        where: {
          environmentId: input.copyFromEnvId,
        },
      });

      // Format the flags to be created in the new environment
      const flags = flagsFromEnv.map((flag) => ({
        slug: flag.slug,
        payload: flag.payload ?? {},
        expiredAt: flag.expiredAt,
        description: flag.description,
      }));

      const environment = await ctx.prisma.environment.create({
        data: {
          name: input.name,
          slug: generateSlug(),
          description: input.description,
          project: {
            connect: {
              id: input.projectId,
            },
          },
          flags: {
            create: flags,
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
    input: UpdateEnvironmentInput,
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
    input: DeleteEnvironmentInput,
    resolve: async ({ ctx, input }) => {
      const environment = await ctx.prisma.environment.delete({
        where: {
          id: input.environmentId,
        },
      });

      return { environment };
    },
  }); */
