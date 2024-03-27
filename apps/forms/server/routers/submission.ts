import { protectedProcedure, router } from "server/trpc";
// Utils
import { z } from "zod";

export const submissionRouter = router({
  all: protectedProcedure
    .input(
      z.object({
        formId: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        search: z.string().optional().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const limit = input.limit ?? 50;

      const search = input.search
        ? {
            name: {
              search: input.search,
            },
          }
        : {};

      const submissions = await ctx.prisma.submission.findMany({
        where: {
          form: {
            id: input.formId,
            users: {
              some: {
                user: {
                  id: userId,
                },
              },
            },
            ...search,
          },
        },
        take: limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      });

      let nextCursor: typeof input.cursor | undefined = undefined;

      if (submissions.length > limit) {
        const nextItem = submissions.pop();
        nextCursor = nextItem!.id;
      }

      return {
        submissions,
        nextCursor,
      };
    }),
});
