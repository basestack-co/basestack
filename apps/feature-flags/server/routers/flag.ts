import { protectedProcedure, router } from "server/trpc";
import { TRPCError } from "@trpc/server";
// Utils
import { getValue } from "@basestack/utils";
import {
  CreateFlagInput,
  DeleteFlagInput,
  FlagByIdInput,
  UpdateFlagInput,
  AllFlagsInput,
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

      return await ctx.prisma.$transaction(async (tx) => {
        const env = await tx.environment.findFirst({
          where: { isDefault: true, projectId: input.projectId },
        });

        if (env) {
          const allFlags = await tx.flag.findMany({
            where: {
              environment: {
                id: env.id,
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
            },
          });

          const flags = await Promise.all(
            allFlags.map(async (flag) => {
              const allEnvironments = await tx.flag.findMany({
                where: { slug: flag.slug },
                select: {
                  enabled: true,
                  environment: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              });

              return {
                ...flag,
                environments: allEnvironments.map((item) => ({
                  ...item.environment,
                  enabled: item.enabled,
                })),
              };
            })
          );

          const totalFlags = await tx.flag.count();

          return {
            flags,
            pagination: {
              skip,
              take,
              total: totalFlags,
            },
          };
        } else {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Could not find the default environment",
          });
        }
      });
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

      return {
        ...flag,
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
