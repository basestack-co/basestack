import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
import { TRPCError } from "@trpc/server";
// Utils
import { generateSlug } from "random-word-slugs";
import { withRoles } from "@basestack/utils";
import { z } from "zod";
// Inputs
import { Role } from ".prisma/client";

export const environmentRouter = createTRPCRouter({
  all: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required(),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.project.findFirst({
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
    .input(
      z
        .object({
          projectId: z.string(),
          name: z.string(),
          description: z.string(),
          copyFromEnvId: z.string(),
        })
        .required(),
    )
    .meta({
      restricted: true,
    })
    .mutation(async ({ ctx, input }) => {
      const authorized = withRoles(ctx.project.role, [Role.ADMIN])(() =>
        ctx.prisma.$transaction(async (tx) => {
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

          return tx.environment.create({
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
        }),
      );

      const environment = await authorized();

      return { environment };
    }),
  update: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z
        .object({
          projectId: z.string(),
          environmentId: z.string().min(1),
          name: z.string(),
          description: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const authorized = withRoles(ctx.project.role, [Role.ADMIN])(() =>
        ctx.prisma.environment.update({
          where: {
            id: input.environmentId,
          },
          data: {
            name: input.name,
            description: input.description,
          },
        }),
      );

      const environment = await authorized();

      return { environment };
    }),
  delete: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z
        .object({
          projectId: z.string(),
          environmentId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const authorized = withRoles(ctx.project.role, [Role.ADMIN])(() =>
        ctx.prisma.$transaction(async (tx) => {
          // TODO: find a better way to do this, this is a bit hacky, should be in the same query
          const current = await tx.environment.findFirst({
            where: { id: input.environmentId },
          });

          // only allow deleting the environment if it's not the default
          if (current && !current.isDefault) {
            return tx.environment.delete({
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
        }),
      );

      const environment = await authorized();

      return { environment };
    }),
});
