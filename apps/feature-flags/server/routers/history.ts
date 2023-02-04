import { protectedProcedure, router } from "server/trpc";
// Utils
import { isEmpty } from "@basestack/utils";
import { AllHistoryInput, CreateHistoryInput } from "../schemas/history";

export const historyRouter = router({
  all: protectedProcedure
    .input(AllHistoryInput)
    .query(async ({ ctx, input }) => {
      const getId = isEmpty(input.flagSlug)
        ? { projectId: input.projectId }
        : {
            payload: {
              path: ["flag", "slug"],
              equals: input.flagSlug,
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


      let  response = []


        if(history && !!history.length){

            response = history.map(({id, }) => {


                return {

                }


            })


        }






      return { history };
    }),
  create: protectedProcedure
    .input(CreateHistoryInput)
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
