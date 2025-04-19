import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
import { TRPCError } from "@trpc/server";
// Utils
import { generateSlug } from "random-word-slugs";
import { z } from "zod";
// DB
import { withUsageUpdate } from "server/db/utils/subscription";
// Types
import { Role } from ".prisma/client";

export const environmentRouter = createTRPCRouter({
  all: protectedProcedure
    .meta({
      isProjectRestricted: true,
    })
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx?.session?.user.id;

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
    .meta({
      isProjectRestricted: true,
      roles: [Role.ADMIN, Role.DEVELOPER],
      usageLimitKey: "environments",
    })
    .input(
      z
        .object({
          projectId: z.string(),
          name: z.string(),
          description: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const projectAdminUserId = ctx.project.adminUserId;

      const environment = ctx.prisma.$transaction(async (tx) => {
        const defaultEnvironment = await tx.environment.findFirst({
          where: {
            projectId: input.projectId,
            isDefault: true,
          },
          select: {
            id: true,
          },
        });

        // Get all the flags from a selected environment
        const flags = await tx.flag.findMany({
          where: {
            environmentId: defaultEnvironment?.id,
          },
          select: {
            slug: true,
            payload: true,
            expiredAt: true,
            description: true,
          },
        });

        const newEnvironment = await tx.environment.create({
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

        await withUsageUpdate(
          tx,
          projectAdminUserId,
          "environments",
          "increment"
        );

        return newEnvironment;
      });

      return { environment };
    }),
  update: protectedProcedure
    .meta({
      isProjectRestricted: true,
      roles: [Role.ADMIN, Role.DEVELOPER],
    })
    .input(
      z
        .object({
          projectId: z.string(),
          environmentId: z.string().min(1),
          name: z.string(),
          description: z.string(),
        })
        .required()
    )
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
      isProjectRestricted: true,
      roles: [Role.ADMIN, Role.DEVELOPER],
    })
    .input(
      z
        .object({
          projectId: z.string(),
          environmentId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const projectAdminUserId = ctx.project.adminUserId;

      const environment = await ctx.prisma.$transaction(async (tx) => {
        // TODO: find a better way to do this, this is a bit hacky, should be in the same query
        const current = await tx.environment.findFirst({
          where: { id: input.environmentId },
        });

        // only allow deleting the environment if it's not the default
        if (current && !current.isDefault) {
          const environment = await tx.environment.delete({
            where: {
              id: input.environmentId,
            },
          });

          await withUsageUpdate(
            tx,
            projectAdminUserId,
            "environments",
            "decrement"
          );

          return environment;
        } else {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You cannot delete the default environment",
            cause: "CannotDeleteDefaultEnvironment",
          });
        }
      });

      return { environment };
    }),
});
