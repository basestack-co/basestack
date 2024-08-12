import { protectedProcedure, router } from "server/trpc";
// Utils
import { z } from "zod";

export const historyRouter = router({
  all: protectedProcedure
    .input(
      z
        .object({
          projectId: z.string(),
          flagId: z.string().optional().nullable(),
          search: z.string().optional().nullable(),
          range: z.array(z.date()).optional().nullable(),
        })
        .required(),
    )
    .query(async ({ ctx, input }) => {
      const getId = !input.flagId
        ? {
            projectId: input.projectId,
            ...(!!input.search
              ? {
                  payload: {
                    path: ["flag", "slug"],
                    string_contains: input.search,
                  },
                }
              : {}),
            ...(!!input.range?.length
              ? {
                  createdAt: {
                    lte: input.range[1],
                    gte: input.range[0],
                  },
                }
              : {}),
          }
        : {
            payload: {
              path: ["flag", "ids"],
              array_contains: [input.flagId],
            },
          };

      const history = await ctx.prisma.history.findMany({
        where: {
          ...getId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return { history };
    }),
  create: protectedProcedure
    .input(
      z
        .object({
          projectId: z.string(),
          action: z.string(),
          payload: z.object({}),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const history = await ctx.prisma.history.create({
        data: {
          action: input.action,
          payload: input.payload,
          project: {
            connect: {
              id: input.projectId,
            },
          },
        },
      });

      return { ...history };
    }),
});
