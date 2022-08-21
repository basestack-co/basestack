import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import * as yup from "yup";
import { getValue, groupBy } from "@basestack/utils";
import dayjs from "dayjs";

export const flagRouter = createProtectedRouter()
  .query("all", {
    meta: {
      restricted: true,
    },
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

      const skip = getValue(input.pagination, "skip", "0");
      const take = getValue(input.pagination, "take", "50");

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
        flags: getValue(flags, "[0].flags", []),
        pagination: {
          skip: Number(skip),
          take: Number(take),
          total: getValue(flags, "[0]._count.flags", 0),
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
  .query("byProjectSlug", {
    meta: {
      restricted: true,
    },
    input: yup.object({
      projectSlug: yup.string().required(),
      pagination: yup
        .object({
          skip: yup.string(),
          take: yup.string(),
        })
        .nullable(),
    }),
    async resolve({ ctx, input }) {
      const skip = getValue(input.pagination, "skip", "0");
      const take = getValue(input.pagination, "take", "50");

      const [allFlags, totalFlags] = await ctx.prisma.$transaction([
        ctx.prisma.flag.findMany({
          where: {
            environment: {
              project: {
                slug: input.projectSlug,
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
          createdAt: getValue(flags, "[0].createdAt", ""),
          flags,
          environments: flags
            .map(({ environment: { id, name }, enabled }) => ({
              id,
              name,
              enabled,
            }))
            .reverse(),
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
    meta: {
      restricted: true,
    },
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
    meta: {
      restricted: true,
    },
    input: yup.object({
      // this prop is used on the createProtectedRouter Middleware to validated user project permissions
      projectId: yup.string().required(),
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
    meta: {
      restricted: true,
    },
    input: yup.object({
      // this prop is used on the createProtectedRouter Middleware to validated user project permissions
      projectId: yup.string().required(),
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
