import { protectedProcedure, router } from "server/trpc";
import { TRPCError } from "@trpc/server";
// Utils
import { generateSlug } from "random-word-slugs";
import { withRoles } from "libs/prisma/utils/authorization";
// Inputs
import schemas from "server/schemas";
import { Role } from "@prisma/client";

export const environmentRouter = router({
  all: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.environment.input.all)
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
    .input(schemas.environment.input.create)
    .meta({
      restricted: true,
    })
    .mutation(async ({ ctx, input }) => {
      const authorized = await withRoles(ctx.project.role, [Role.ADMIN])(() =>
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
        }),
      );

      const environment = await authorized();

      return { environment };
    }),
  update: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.environment.input.update)
    .mutation(async ({ ctx, input }) => {
      const authorized = await withRoles(ctx.project.role, [Role.ADMIN])(() =>
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
    .input(schemas.environment.input.delete)
    .mutation(async ({ ctx, input }) => {
      const authorized = await withRoles(ctx.project.role, [Role.ADMIN])(() =>
        ctx.prisma.$transaction(async (tx) => {
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
        }),
      );

      const environment = await authorized();

      return { environment };
    }),
});
