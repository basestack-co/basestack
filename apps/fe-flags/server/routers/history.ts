// import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "server/createProtectedRouter";
// Utils
import * as yup from "yup";
import isEmpty from "lodash.isempty";

export const historyRouter = createProtectedRouter()
  .query("all", {
    input: yup.object({
      projectId: yup.string().required(),
      flagId: yup.string().optional(),
    }),
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
    input: yup.object({
      projectId: yup.string().required(),
      action: yup.string().required(),
      payload: yup.mixed().required(),
    }),
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
