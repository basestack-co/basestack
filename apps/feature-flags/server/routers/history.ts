// import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import { z } from "zod";
import { isEmpty } from "@basestack/utils";

export const historyRouter = createProtectedRouter()
  .query("all", {
    input: z
      .object({
        projectId: z.string(),
        flagId: z.string().optional(),
      })
      .required(),
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
    input: z
      .object({
        projectId: z.string(),
        action: z.string(),
        payload: z.any(),
      })
      .required(),
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
