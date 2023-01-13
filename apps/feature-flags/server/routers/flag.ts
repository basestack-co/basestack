import { protectedProcedure, router } from "server/trpc";
// Utils
import { getValue, groupBy } from "@basestack/utils";
import {
  AllFlagsInput,
  CreateFlagInput,
  DeleteFlagInput,
  FlagByIdInput,
  FlagByProjectSlugInput,
  UpdateFlagInput,
} from "../schemas/flag";

export const flagRouter = router({
  all: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(AllFlagsInput)
    .query(async ({ ctx, input }) => {
      const skip = getValue(input.pagination, "skip", 0);
      const take = getValue(input.pagination, "take", 50);

      const search = input.search
        ? {
            slug: {
              search: input.search,
            },
          }
        : {};

      const [allFlags, totalFlags] = await ctx.prisma.$transaction([
        ctx.prisma.flag.findMany({
          where: {
            environment: {
              id: input.environmentId,
              project: {
                id: input.projectId,
              },
            },
            ...search,
          },
          skip,
          take,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            slug: true,
            description: true,
            enabled: true,
            createdAt: true,
            environment: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        ctx.prisma.flag.count(),
      ]);

      return {
        flags: allFlags.map((flag) => ({
          ...flag,
          environments: [{ ...flag.environment, enabled: flag.enabled }],
        })),
        pagination: {
          skip,
          take,
          total: totalFlags,
        },
      };
    }),
  byId: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(FlagByIdInput)
    .query(async ({ ctx, input }) => {
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
    }),
  byProjectSlug: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(FlagByProjectSlugInput)
    .query(async ({ ctx, input }) => {
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
    }),
  create: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(CreateFlagInput)
    .mutation(async ({ ctx, input }) => {
      // this is workaround for prisma bug on createMany not returning the created data
      /* return await this.prisma.$transaction(
        users.map((user) => prisma.user.create({ data: userCreateData })),
     ); */

      const flag = await ctx.prisma.flag.createMany({
        data: input.data,
      });

      return { flag };
    }),
  update: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(UpdateFlagInput)
    .mutation(async ({ ctx, input }) => {
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
    }),
  delete: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(DeleteFlagInput)
    .mutation(async ({ ctx, input }) => {
      const flag = await ctx.prisma.flag.delete({
        where: {
          id: input.flagId,
        },
      });

      return { flag };
    }),
});
