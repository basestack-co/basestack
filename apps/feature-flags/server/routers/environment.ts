import { protectedProcedure, router } from "server/trpc";
import { TRPCError } from "@trpc/server";
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
    }),
  create: protectedProcedure
    .input(CreateEnvironmentInput)
    .meta({
      restricted: true,
    })
    .mutation(async ({ ctx, input }) => {
      const environment = await ctx.prisma.$transaction(async (tx) => {
        // Get all the flags from a selected environment
        const flags = await tx.flag.findMany({
          where: {
            environmentId: input.copyFromEnvId,
          },
          select: {
            slug: true,
            payload: true,
            expiredAt: true,
            description: true,
          },
        });

        return await tx.environment.create({
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
              // @ts-ignore
              create: flags,
            },
          },
        });
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
      const environment = await ctx.prisma.$transaction(async (tx) => {
        // TODO: find a better way to do this, this is a bit hacky, should be in the same query
        const current = await tx.environment.findFirst({
          where: { id: input.environmentId },
        });

        // only allow deleting the environment if it's not the default
        if (current && !current.isDefault) {
          return await tx.environment.delete({
            where: {
              id: input.environmentId,
            },
          });
        } else {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You cannot delete the default environment",
          });
        }
      });

      return { environment };
    }),
});
