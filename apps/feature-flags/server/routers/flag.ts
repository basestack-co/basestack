import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import { z } from "zod";
import { getValue, groupBy } from "@basestack/utils";

export const flagRouter = createProtectedRouter()
  .query("all", {
    meta: {
      restricted: true,
    },
    input: z
      .object({
        projectSlug: z.string(),
        projectId: z.string(),
        environmentId: z.string(),
        pagination: z
          .object({
            skip: z.string(),
            take: z.string(),
          })
          .nullable(),
      })
      .required(),
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
    input: z
      .object({
        flagId: z.string(),
      })
      .required(),
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
    input: z
      .object({
        projectSlug: z.string(),
        pagination: z
          .object({
            skip: z.string(),
            take: z.string(),
          })
          .nullable(),
      })
      .required(),
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

      const grouped = groupBy(allFlags, (c: typeof allFlags[number]) => c.slug);

      const response = Object.keys(grouped || {}).map((key) => {
        const flags: Array<typeof allFlags[number]> = grouped[key];
        return {
          slug: key,
          createdAt: getValue(flags, "[0].createdAt", ""),
          description: getValue(
            flags,
            "[0].description",
            "No description provided"
          ),
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
        flags: response,
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
    input: z.object({
      // this prop is used on the createProtectedRouter Middleware to validated user project permissions
      projectId: z.string(),
      data: z.array(
        z.object({
          environmentId: z.string(),
          slug: z.string(),
          enabled: z.boolean(),
          payload: z.any().optional().nullable(),
          expiredAt: z.date().optional().nullable(),
          description: z.string().optional(),
        })
      ),
    }),
    resolve: async ({ ctx, input }) => {
      const flag = await ctx.prisma.flag.createMany({
        data: input.data,
      });

      return { flag };
    },
  })
  .mutation("update", {
    meta: {
      restricted: true,
    },
    input: z
      .object({
        // this prop is used on the createProtectedRouter Middleware to validated user project permissions
        projectId: z.string(),
        flagId: z.string(),
        enabled: z.boolean(),
        payload: z.any().optional(),
        expiredAt: z.date().nullable(),
        description: z.string().nullable(),
      })
      .required(),
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
    input: z
      .object({
        // this prop is used on the createProtectedRouter Middleware to validated user project permissions
        projectId: z.string(),
        flagId: z.string(),
      })
      .required(),
    resolve: async ({ ctx, input }) => {
      const flag = await ctx.prisma.flag.delete({
        where: {
          id: input.flagId,
        },
      });

      return { flag };
    },
  });
