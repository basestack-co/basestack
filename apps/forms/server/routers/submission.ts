import { protectedProcedure, router } from "server/trpc";
// Utils
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const submissionRouter = router({
  all: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z.object({
        formId: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        search: z.string().optional().nullable(),
        filters: z.object({ isSpam: z.boolean() }).nullable().default(null),
        orderBy: z.string().optional().nullable().default("desc"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const limit = input.limit ?? 50;

      const search = input.search
        ? {
            data: {
              path: ["email"],
              string_contains: input.search,
            },
          }
        : {};

      const filters = input.filters
        ? {
            isSpam: input.filters.isSpam,
          }
        : {};

      const orderBy = [
        { createdAt: input.orderBy },
        { id: input.orderBy },
      ] as any;

      return await ctx.prisma.$transaction(async (tx) => {
        const { _count } = await tx.submission.aggregate({
          _count: { id: true },
          where: {
            formId: input.formId,
            ...search,
            ...filters,
          },
        });

        const submissions = await tx.submission.findMany({
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
            },
            ...search,
            ...filters,
          },
          take: limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          orderBy,
        });

        let nextCursor: typeof input.cursor | undefined = undefined;

        if (submissions.length > limit) {
          const nextItem = submissions.pop();
          nextCursor = nextItem!.id;
        }

        return {
          submissions,
          nextCursor,
          total: _count.id,
        };
      });
    }),
  export: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z.object({
        formId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

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
          },
        },
        select: {
          isSpam: true,
          viewed: true,
          data: true,
          createdAt: true,
        },
      });

      const headersSet: Set<string> = new Set();

      submissions.forEach((item) => {
        const dataKeys = item.data ? Object.keys(item.data) : [];
        dataKeys.forEach((key) => headersSet.add(key));
      });

      const dataHeaders: string[] = Array.from(headersSet).sort();

      let data: string = dataHeaders.join(",") + ",";

      const commonHeaders: string[] = ["isSpam", "viewed", "createdAt"];
      data += commonHeaders.join(",") + "\n";

      submissions.forEach((item) => {
        const dataRow: string[] = dataHeaders.map(
          (header) =>
            (item.data && item.data[header as keyof typeof item.data]) || "",
        );

        const commonRow: (string | boolean | undefined | null)[] =
          commonHeaders.map((header) => {
            if (header === "isSpam" || header === "viewed") {
              return item[header];
            } else if (header === "createdAt") {
              return new Date(item[header]).toISOString();
            }
          });

        const rowData: (string | boolean | undefined | null)[] = [
          ...dataRow,
          ...commonRow,
        ];

        data += rowData.join(",") + "\n";
      });

      return { data };
    }),
  update: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z
        .object({
          formId: z.string(),
          ids: z.array(z.string()),
          isSpam: z.boolean().nullable().default(null),
          viewed: z.boolean().nullable().default(null),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { formId, ids, ...props } = input;
      const data = Object.fromEntries(
        Object.entries(props).filter(([_, value]) => value !== null),
      );

      if (Object.keys(data).length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const submissions = await ctx.prisma.submission.updateMany({
        where: {
          id: {
            in: ids,
          },
          form: {
            id: formId,
            users: {
              some: {
                user: {
                  id: userId,
                },
              },
            },
          },
        },
        data,
      });

      return { submissions };
    }),
  delete: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z.object({
        formId: z.string(),
        ids: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const submissions = await ctx.prisma.submission.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
          form: {
            id: input.formId,
            users: {
              some: {
                user: {
                  id: userId,
                },
              },
            },
          },
        },
      });

      return { submissions };
    }),
});
