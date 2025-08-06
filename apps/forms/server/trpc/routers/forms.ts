// Types
import { Role } from ".prisma/client";
import { TRPCError } from "@trpc/server";
import { withUsageUpdate } from "server/db/utils/subscription";
import {
  createTRPCRouter,
  protectedProcedure,
  withFormRestrictions,
} from "server/trpc";
// Utils
import { z } from "zod";

export const formsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id!;

    const all = await ctx.prisma.form.findMany({
      where: {
        users: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        users: {
          where: {
            userId,
          },
          select: {
            role: true,
          },
          take: 1,
        },
      },
    });

    const forms = all.map((form) => ({
      ...form,
      isAdmin: form.users[0]?.role === Role.ADMIN,
      role: form.users[0]?.role ?? Role.VIEWER,
    }));

    return { forms };
  }),
  recent: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id!;

    // TODO: Find a way to do this with Prisma Models and not raw SQL
    // This solves the N+1 problem we had before with the previous query
    // https://github.com/prisma/prisma/issues/15423
    const formsWithCounts = await ctx.prisma.$queryRaw<
      {
        id: string;
        name: string;
        isEnabled: boolean;
        _all: number;
        _spam: number;
        _viewed: number;
        role: string;
      }[]
    >`
      SELECT f.id,
            f.name,
            f."isEnabled",
            COUNT(s."id")                                      AS _all,
            SUM(CASE WHEN s."isSpam" = true THEN 1 ELSE 0 END) AS _spam,
            SUM(CASE WHEN s."viewed" = true THEN 1 ELSE 0 END) AS _viewed,
            uf.role                                            AS role
      FROM public."Form" f
              LEFT JOIN public."Submission" s ON f.id = s."formId"
              INNER JOIN public."FormOnUsers" uf ON uf."form_id" = f.id AND uf."user_id" = ${userId}
      GROUP BY f.id, f.name, f."isEnabled", uf.role
      ORDER BY f."createdAt" DESC
      LIMIT 8;
    `;

    return formsWithCounts.map((form) => {
      const _all = Number(form._all);
      const _spam = Number(form._spam);
      const _viewed = Number(form._viewed);

      return {
        id: form.id,
        name: form.name,
        isEnabled: form.isEnabled,
        isAdmin: form.role === Role.ADMIN,
        _count: {
          spam: _spam,
          unread: _all - _viewed,
          read: _viewed,
        },
      };
    });
  }),
  byId: protectedProcedure
    .use(
      withFormRestrictions({
        roles: [Role.ADMIN, Role.DEVELOPER, Role.TESTER, Role.VIEWER],
      })
    )
    .input(
      z
        .object({
          formId: z.string(),
        })
        .required()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx?.auth?.user.id!;

      const data = await ctx.prisma.formOnUsers.findFirst({
        where: {
          formId: input.formId,
          userId,
        },
        select: {
          role: true,
          form: {
            select: {
              id: true,
              name: true,
              hasDataQueryString: true,
              redirectUrl: true,
              successUrl: true,
              errorUrl: true,
              isEnabled: true,
              hasRetention: true,
              hasSpamProtection: true,
              webhookUrl: true,
              emails: true,
              websites: true,
              honeypot: true,
              blockIpAddresses: true,
              users: {
                where: { role: Role.ADMIN },
                select: {
                  user: {
                    select: {
                      name: true,
                      email: true,
                      image: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Form not found",
          cause: "FormNotFound",
        });
      }

      return {
        id: data?.form.id,
        name: data?.form.name,
        hasDataQueryString: data?.form.hasDataQueryString,
        redirectUrl: data?.form.redirectUrl,
        successUrl: data?.form.successUrl,
        errorUrl: data?.form.errorUrl,
        isEnabled: data?.form.isEnabled,
        hasRetention: data?.form.hasRetention,
        hasSpamProtection: data?.form.hasSpamProtection,
        webhookUrl: data?.form.webhookUrl,
        emails: data?.form.emails,
        websites: data?.form.websites,
        honeypot: data?.form.honeypot,
        blockIpAddresses: data?.form.blockIpAddresses,
        role: data?.role,
        owner: data?.form.users[0]?.user,
      };
    }),
  create: protectedProcedure
    .input(
      z
        .object({
          name: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.auth?.user.id!;

      return await ctx.prisma.$transaction(async (tx) => {
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

        await withUsageUpdate(tx, userId, "forms", "increment");

        return { form, connection };
      });
    }),
  update: protectedProcedure
    .use(withFormRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          formId: z.string(),
          feature: z
            .enum([
              "hasFileUploads",
              "hasDataQueryString",
              "hasCustomUrls",
              "hasRules",
              "hasEmailNotifications",
              "hasBlockIPs",
              "hasWebhooks",
              "hasWebsites",
              "hasCustomExport",
              "hasAutoResponses",
              "hasIntegrations",
              "hasCustomEmailTemplates",
              "hasSpamProtection",
            ])
            .nullable()
            .default(null),
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
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const { formId, ...props } = input;
      const data = Object.fromEntries(
        Object.entries(props).filter(([_, value]) => value !== null)
      );

      if (Object.keys(data).length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No valid fields to update",
          cause: "NoValidFieldsToUpdate",
        });
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
    .use(withFormRestrictions({ roles: [Role.ADMIN] }))
    .input(
      z
        .object({
          formId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.auth?.user.id!;

      const form = await ctx.prisma.$transaction(async (tx) => {
        const response = await tx.form.delete({
          where: {
            id: input.formId,
          },
        });

        await withUsageUpdate(tx, userId, "forms", "decrement");

        return response;
      });

      return { form };
    }),
});
