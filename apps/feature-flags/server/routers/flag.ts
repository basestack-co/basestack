import { protectedProcedure, router } from "server/trpc";
import { TRPCError } from "@trpc/server";
// Utils
import { getValue } from "@basestack/utils";
// Inputs
import schemas from "server/schemas";

import { z } from "zod";

export const flagRouter = router({
  all: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        search: z.string().optional().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;

      const search = input.search
        ? {
            slug: {
              search: input.search,
            },
          }
        : {};

      return await ctx.prisma.$transaction(async (tx) => {
        const env = await tx.environment.findFirst({
          where: { isDefault: true, projectId: input.projectId },
        });

        if (env) {
          const flags = await tx.flag.findMany({
            where: {
              environment: {
                id: env.id,
                project: {
                  id: input.projectId,
                },
              },
              ...search,
            },
            take: limit + 1, // get an extra item at the end which we'll use as next cursor
            cursor: input.cursor ? { id: input.cursor } : undefined,
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
            select: {
              id: true,
              slug: true,
              description: true,
              enabled: true,
              createdAt: true,
              expiredAt: true,
              payload: true,
            },
          });

          let nextCursor: typeof input.cursor | undefined = undefined;

          if (flags.length > limit) {
            const nextItem = flags.pop();
            nextCursor = nextItem!.id;
          }

          return {
            flags,
            nextCursor,
          };
        } else {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Could not find the default environment",
          });
        }
      });
    }),
  total: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.flag.input.total)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction(async (tx) => {
        const env = await tx.environment.findFirst({
          where: { isDefault: true, projectId: input.projectId },
        });

        if (env) {
          const { _count } = await tx.flag.aggregate({
            _count: { id: true },
            where: {
              environment: {
                id: env.id,
                project: {
                  id: input.projectId,
                },
              },
            },
          });

          return {
            total: _count.id,
          };
        } else {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Could not find the default environment",
          });
        }
      });
    }),
  environments: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.flag.input.environments)
    .query(async ({ ctx, input }) => {
      const allEnvironments = await ctx.prisma.flag.findMany({
        where: { slug: input.slug },
        select: {
          enabled: true,
          environment: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        environments: allEnvironments.map((item) => ({
          ...item.environment,
          enabled: item.enabled,
        })),
      };
    }),
  bySlug: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.flag.input.bySlug)
    .query(async ({ ctx, input }) => {
      const flags = await ctx.prisma.flag.findMany({
        where: {
          slug: input.slug,
        },
        select: {
          id: true,
          slug: true,
          description: true,
          expiredAt: true,
          payload: true,
          enabled: true,
          environment: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const data = flags && !!flags.length ? flags : [];

      return {
        slug: getValue(flags, "[0].slug", ""),
        description: getValue(flags, "[0].description", ""),
        environments: data.map(
          ({
            environment: { id, name },
            id: flagId,
            enabled,
            payload,
            expiredAt,
          }) => ({
            id,
            name,
            enabled,
            flagId,
            payload: JSON.stringify(payload),
            expiredAt,
          }),
        ),
      };
    }),
  create: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.flag.input.create)
    .mutation(async ({ ctx, input }) => {
      // TODO: this is workaround for prisma bug on createMany not returning the created data
      const flags = await ctx.prisma.$transaction(async (tx) => {
        return await Promise.all(
          input.data.map(async (flagCreateData) =>
            tx.flag.create({ data: flagCreateData }),
          ),
        );
      });

      return { flags };
    }),
  update: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.flag.input.update)
    .mutation(async ({ ctx, input }) => {
      const flags = await ctx.prisma.$transaction(async (tx) => {
        return await Promise.all(
          input.data.map(async ({ id, ...data }) => {
            const updatedFlag = await tx.flag.update({
              where: {
                id,
              },
              data,
            });

            return {
              ...updatedFlag,
            };
          }),
        );
      });

      return { flags };
    }),
  delete: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(schemas.flag.input.delete)
    .mutation(async ({ ctx, input }) => {
      const flags = await ctx.prisma.flag.deleteMany({
        where: {
          slug: input.flagSlug,
        },
      });

      return { flags };
    }),
});
