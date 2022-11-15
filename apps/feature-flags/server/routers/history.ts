// import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import { isEmpty } from "@basestack/utils";
import { AllHistoryInput, CreateHistoryInput } from "../schemas/history";

export const historyRouter = createProtectedRouter()
  .query("all", {
    input: AllHistoryInput,
    async resolve({ ctx, input }) {
      const getId = isEmpty(input.flagId)
        ? { projectId: input.projectId }
        : {
            payload: {
              path: ["flag", "id"],
              equals: input.flagId,
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
    },
  })
  .mutation("create", {
    input: CreateHistoryInput,
    resolve: async ({ ctx, input }) => {
      const history = await ctx.prisma.history.create({
        data: {
          action: input.action,
          payload: JSON.stringify(input.payload),
          project: {
            connect: {
              id: input.projectId,
            },
          },
        },
      });

      return { ...history };
    },
  });
