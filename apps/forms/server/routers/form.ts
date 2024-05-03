import { protectedProcedure, router } from "server/trpc";
import { TRPCError } from "@trpc/server";
// Types
import { Role } from "@prisma/client";
// Utils
import { z } from "zod";
import { withRoles, config, PlanTypeId } from "@basestack/utils";

export const formRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const forms = await ctx.prisma.form.findMany({
      where: {
        users: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { forms };
  }),
  recent: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // TODO: Find a way to do this with Prisma Models and not raw SQL
    // This solves the N+1 problem we had before with the previous query
    // https://github.com/prisma/prisma/issues/15423
    const formsWithCounts = await ctx.prisma.$queryRaw<
      {
        id: string;
        name: string;
        _all: number;
        isEnabled: boolean;
        _spam: number;
        _viewed: number;
      }[]
    >`
      SELECT
          f.id,
          f.name,
          f."isEnabled",
          COUNT(s."id") AS _all,
          SUM(CASE WHEN s."isSpam" = true THEN 1 ELSE 0 END) AS _spam,
          SUM(CASE WHEN s."viewed" = true THEN 1 ELSE 0 END) AS _viewed
        FROM
          public."Form" f
        LEFT JOIN
          public."Submission" s
        ON
          f.id = s."formId"
        WHERE
          EXISTS (
            SELECT 1 FROM public."FormOnUsers" uf
            WHERE uf."form_id" = f.id AND uf."user_id" = ${userId}
          )
        GROUP BY
          f.id, f.name, f."isEnabled"
        ORDER BY
          f."createdAt" DESC
        LIMIT
          8;
   `;

    return formsWithCounts.map((form) => {
      const _all = Number(form._all);
      const _spam = Number(form._spam);
      const _viewed = Number(form._viewed);

      return {
        id: form.id,
        name: form.name,
        _count: {
          spam: _spam,
          unread: _all - _viewed,
          read: _viewed,
        },
      };
    });
  }),
  byId: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z
        .object({
          formId: z.string(),
        })
        .required(),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const data = await ctx.prisma.formOnUsers.findFirst({
        where: {
          formId: input.formId,
          userId,
        },
        select: {
          role: true,
          form: {
            omit: {
              createdAt: true,
              updatedAt: true,
              rules: true,
            },
          },
        },
      });

      return {
        ...data?.form,
        role: data?.role,
      };
    }),
  create: protectedProcedure
    .meta({
      restricted: false,
    })
    .input(
      z
        .object({
          name: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;



      return ctx.prisma.$transaction(async (tx) => {
        const form = await tx.form.create({
          data: {
            name: input.name,
          },
          select: {
            id: true,
            name: true,
          },
        });

        const connection = await tx.formOnUsers.create({
          data: {
            form: {
              connect: {
                id: form.id,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return { form, connection };
      });
    }),
  update: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z
        .object({
          formId: z.string(),
          name: z.string().nullable().default(null),
          isEnabled: z.boolean().nullable().default(null),
          hasRetention: z.boolean().nullable().default(null),
          hasSpamProtection: z.boolean().nullable().default(null),
          hasDataQueryString: z.boolean().nullable().default(null),
          blockIpAddresses: z.string().nullable().default(null),
          successUrl: z.string().nullable().default(null),
          errorUrl: z.string().nullable().default(null),
          webhookUrl: z.string().nullable().default(null),
          emails: z.string().nullable().default(null),
          redirectUrl: z.string().nullable().default(null),
          honeypot: z.string().nullable().default(null),
          websites: z.string().nullable().default(null),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const { formId, ...props } = input;
      const data = Object.fromEntries(
        Object.entries(props).filter(([_, value]) => value !== null),
      );

      if (Object.keys(data).length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const form = await ctx.prisma.form.update({
        where: {
          id: formId,
        },
        data,
      });

      return { form };
    }),
  delete: protectedProcedure
    .meta({
      restricted: true,
    })
    .input(
      z
        .object({
          formId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const authorized = withRoles(ctx.form.role, [Role.ADMIN])(() =>
        ctx.prisma.form.delete({
          where: {
            id: input.formId,
          },
        }),
      );

      const form = await authorized();

      return { form };
    }),
});
