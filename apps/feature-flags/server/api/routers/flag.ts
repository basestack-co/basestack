import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
import { TRPCError } from "@trpc/server";
// Utils
import { withLimits, withUsageUpdate } from "server/db/utils/subscription";
import { z } from "zod";
import { PlanTypeId } from "@basestack/utils";

export const flagRouter = createTRPCRouter({
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

      return ctx.prisma.$transaction(async (tx) => {
        const env = await tx.environment.findFirst({
          where: { isDefault: true, projectId: input.projectId },
        });

        if (env) {
          const where = {
            environment: {
              id: env.id,
              project: {
                id: input.projectId,
              },
            },
            ...search,
          };

          const { _count } = await tx.flag.aggregate({
            _count: { id: true },
            where,
          });

          const flags = await tx.flag.findMany({
            where,
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
  total: protectedProcedure
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
      return ctx.prisma.$transaction(async (tx) => {
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
    .input(
      z
        .object({
          projectId: z.string(),
          slug: z.string(),
        })
        .required(),
    )
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
    .input(
      z
        .object({
          projectId: z.string(),
          slug: z.string(),
        })
        .required(),
    )
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
        slug: flags[0].slug ?? "",
        description: flags[0].description ?? "",
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
    .input(
      z
        .object({
          projectId: z.string(),
          environments: z.array(
            z.object({
              name: z.string(),
              id: z.string(),
              enabled: z.boolean(),
            }),
          ),
          data: z.array(
            z.object({
              slug: z.string(),
              enabled: z.boolean(),
              payload: z.any().optional().nullable(),
              expiredAt: z.date().optional().nullable(),
              description: z.string().optional(),
              environmentId: z.string(),
            }),
          ),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const planId = ctx.usage.planId as PlanTypeId;
      const userId = ctx.session.user.id;

      const authorized = withLimits(
        planId,
        "flags",
        ctx.usage.flags,
      )(() =>
        ctx.prisma.$transaction(async (tx) => {
          const response = await Promise.all(
            input.data.map(async (flagCreateData) =>
              tx.flag.create({ data: flagCreateData }),
            ),
          );

          await withUsageUpdate(tx, userId, "flags", "increment");

          return response;
        }),
      );

      const flags = await authorized();

      return { flags };

      // TODO: this is workaround for prisma bug on createMany not returning the created data
      /* const flags = await ctx.prisma.$transaction(async (tx) => {
        return await Promise.all(
          input.data.map(async (flagCreateData) =>
            tx.flag.create({ data: flagCreateData }),
          ),
        );
      });

      return { flags }; */
    }),
  update: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z
        .object({
          projectId: z.string(),
          environments: z.array(
            z.object({
              name: z.string(),
              id: z.string(),
              enabled: z.boolean(),
            }),
          ),
          data: z.array(
            z.object({
              slug: z.string(),
              enabled: z.boolean(),
              payload: z.any().optional().nullable(),
              expiredAt: z.date().optional().nullable(),
              description: z.string().optional(),
              id: z.string(),
            }),
          ),
        })
        .required(),
    )
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
    .input(
      z
        .object({
          projectId: z.string(),
          flagSlug: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const flags = await ctx.prisma.flag.deleteMany({
        where: {
          slug: input.flagSlug,
        },
      });

      await withUsageUpdate(ctx.prisma, userId, "flags", "decrement");

      return { flags };
    }),
});
