import { protectedProcedure, router } from "server/trpc";
// Utils
import { isEmpty } from "@basestack/utils";
// Inputs
import schemas from "server/schemas";

export const historyRouter = router({
  all: protectedProcedure
    .input(schemas.history.input.all)
    .query(async ({ ctx, input }) => {
      const getId = isEmpty(input.flagId)
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
    .input(schemas.history.input.create)
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
