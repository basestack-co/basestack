// import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import * as yup from "yup";
import get from "lodash.get";
import { groupBy } from "utils/functions";
import isEmpty from "lodash.isempty";

export const flagRouter = createProtectedRouter()
  .query("all", {
    input: yup.object({
      projectId: yup.string().required(),
      environmentId: yup.string().required(),
      pagination: yup
        .object({
          skip: yup.string(),
          take: yup.string(),
        })
        .nullable(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;

      const skip = get(input.pagination, "skip", "0");
      const take = get(input.pagination, "take", "50");

      const flags = await ctx.prisma.environment.findMany({
        where: {
          AND: [
            {
              id: input.environmentId,
            },
            {
              project: {
                id: input.projectId,
                users: {
                  some: {
                    user: {
                      id: userId,
                    },
                  },
                },
              },
            },
          ],
        },
        select: {
          _count: {
            select: { flags: true },
          },
          flags: {
            skip: Number(skip),
            take: Number(take),
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              slug: true,
              description: true,
              enabled: true,
              payload: true,
              environmentId: true,
              expiredAt: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      return {
        flags: get(flags, "[0].flags", []),
        pagination: {
          skip: Number(skip),
          take: Number(take),
          total: get(flags, "[0]._count.flags", 0),
        },
      };
    },
  })
  .query("byId", {
    input: yup.object({
      flagId: yup.string().required(),
    }),
    async resolve({ ctx, input }) {
      const flag = await ctx.prisma.flag.findFirst({
        where: {
          id: input.flagId,
        },
        include: {
          environment: true,
        },
      });

      return {
        ...flag,
      };
    },
  })
  .query("byProjectId", {
    input: yup.object({
      projectId: yup.string().required(),
      pagination: yup
        .object({
          skip: yup.string(),
          take: yup.string(),
        })
        .nullable(),
    }),
    async resolve({ ctx, input }) {
      const skip = get(input.pagination, "skip", "0");
      const take = get(input.pagination, "take", "50");

      const [allFlags, totalFlags] = await ctx.prisma.$transaction([
        ctx.prisma.flag.findMany({
          where: {
            environment: {
              project: {
                id: input.projectId,
              },
            },
          },
          select: {
            id: true,
            slug: true,
            description: true,
            enabled: true,
            payload: true,
            expiredAt: true,
            createdAt: true,
            updatedAt: true,
            environment: true,
          },
          skip: Number(skip),
          take: Number(take),
          orderBy: {
            createdAt: "desc",
          },
        }),
        ctx.prisma.flag.count(),
      ]);

      const grouped = groupBy(allFlags, (c) => c.slug);

      const flags = Object.keys(grouped || {}).map((key) => {
        const flags = grouped[key];
        return {
          slug: key,
          flags,
          environments: flags.map(({ environment: { id, name }, enabled }) => ({
            id,
            name,
            enabled,
          })),
        };
      });

      return {
        flags,
        pagination: {
          skip: Number(skip),
          take: Number(take),
          total: totalFlags,
        },
      };
    },
  })
  .mutation("create", {
    input: yup.object({
      environmentId: yup.string().required(),
      projectId: yup.string().required(),
      slug: yup.string().required(),
      enabled: yup.bool().required(),
      payload: yup.mixed().optional(),
      expiredAt: yup.date().nullable(),
      description: yup.string().optional(),
    }),
    resolve: async ({ ctx, input }) => {
      const flag = await ctx.prisma.flag.create({
        data: {
          slug: input.slug,
          environmentId: input.environmentId,
          enabled: input.enabled,
          payload: input.payload,
          expiredAt: input.expiredAt,
          description: input.description,
        },
      });

      return { flag };
    },
  })
  .mutation("update", {
    input: yup.object({
      flagId: yup.string().required(),
      enabled: yup.bool().required(),
      payload: yup.mixed().optional(),
      expiredAt: yup.date().nullable(),
      description: yup.string().nullable(),
    }),
    resolve: async ({ ctx, input }) => {
      const flag = await ctx.prisma.flag.update({
        where: {
          id: input.flagId,
        },
        data: {
          description: input.description,
          enabled: input.enabled,
          expiredAt: input.expiredAt,
          payload: input.payload,
        },
      });

      return { flag };
    },
  })
  .mutation("delete", {
    input: yup.object({
      flagId: yup.string().required(),
    }),
    resolve: async ({ ctx, input }) => {
      const flag = await ctx.prisma.flag.delete({
        where: {
          id: input.flagId,
        },
      });

      return { flag };
    },
  });
