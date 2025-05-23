import {
  protectedProcedure,
  createTRPCRouter,
  withFormRestrictions,
  withUsageLimits,
} from "server/api/trpc";
import { TRPCError } from "@trpc/server";
// Types
import { Role } from ".prisma/client";
// Utils
import { z } from "zod";
import { Product, AppEnv, config, PlanTypeId } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
import { withUsageUpdate, withFeatures } from "server/db/utils/subscription";
// Vendors
import { qstash } from "@basestack/vendors";

export const formRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
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
    .meta({
      roles: [Role.ADMIN, Role.DEVELOPER, Role.TESTER, Role.VIEWER],
    })
    .use(withFormRestrictions)
    .input(
      z
        .object({
          formId: z.string(),
        })
        .required(),
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
        owner: {
          ...data?.form.users[0]?.user,
          planId: ctx.form.adminSubscriptionPlanId ?? PlanTypeId.FREE,
        },
      };
    }),
  members: protectedProcedure
    .use(withFormRestrictions)
    .input(
      z
        .object({
          formId: z.string(),
        })
        .required(),
    )
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.formOnUsers.findMany({
        where: {
          formId: input.formId,
        },
        select: {
          userId: true,
          formId: true,
          role: true,
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return { users };
    }),
  create: protectedProcedure
    .meta({
      usageLimitKey: "forms",
    })
    .use(withUsageLimits)
    .input(
      z
        .object({
          name: z.string(),
        })
        .required(),
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
    .meta({
      roles: [Role.ADMIN, Role.DEVELOPER],
    })
    .use(withFormRestrictions)
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
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const planId = ctx.form.adminSubscriptionPlanId;

      const { formId, feature, ...props } = input;
      const data = Object.fromEntries(
        Object.entries(props).filter(([_, value]) => value !== null),
      );

      if (Object.keys(data).length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No valid fields to update",
          cause: "NoValidFieldsToUpdate",
        });
      }

      const authorized = withFeatures(
        planId,
        feature,
      )(() =>
        ctx.prisma.form.update({
          where: {
            id: formId,
          },
          data,
        }),
      );

      const form = await authorized();

      return { form };
    }),
  delete: protectedProcedure
    .meta({
      roles: [Role.ADMIN],
    })
    .use(withFormRestrictions)
    .input(
      z
        .object({
          formId: z.string(),
        })
        .required(),
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
  addMember: protectedProcedure
    .use(withFormRestrictions)
    .meta({
      roles: [Role.ADMIN, Role.DEVELOPER],
    })
    .input(
      z
        .object({
          formId: z.string(),
          userId: z.string(),
          role: z.enum(["DEVELOPER", "VIEWER", "TESTER"]),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.auth?.user;

      const connection = await ctx.prisma.formOnUsers.create({
        data: {
          form: {
            connect: {
              id: input.formId,
            },
          },
          user: {
            connect: {
              id: input.userId,
            },
          },
          role: input.role,
        },
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          form: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!!connection.user.email) {
        await qstash.events.sendEmailEvent({
          template: "addFormMember",
          to: [connection.user.email],
          subject: `You have been added to ${connection.form.name} form on Basestack Forms`,
          props: {
            product: "Basestack Forms",
            fromUserName: user?.name ?? "",
            toUserName: connection.user.name,
            form: connection.form.name,
            linkText: "Open Form",
            linkUrl: `${config.urls.getAppWithEnv(Product.FORMS, AppMode as AppEnv)}/a/form/${input.formId}`,
          },
        });
      }

      return { connection };
    }),
  updateMember: protectedProcedure
    .meta({
      roles: [Role.ADMIN],
    })
    .use(withFormRestrictions)
    .input(
      z
        .object({
          formId: z.string(),
          userId: z.string(),
          role: z.enum(["DEVELOPER", "VIEWER", "TESTER"]),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const connection = await ctx.prisma.formOnUsers.update({
        where: {
          formId_userId: {
            formId: input.formId,
            userId: input.userId,
          },
        },
        data: {
          role: input.role,
        },
        select: {
          userId: true,
          role: true,
        },
      });

      return { connection };
    }),
  removeMember: protectedProcedure
    .meta({
      roles: [Role.ADMIN],
    })
    .use(withFormRestrictions)
    .input(
      z
        .object({
          formId: z.string(),
          userId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const connection = await ctx.prisma.formOnUsers.delete({
        where: {
          formId_userId: {
            formId: input.formId,
            userId: input.userId,
          },
        },
      });

      return { connection };
    }),
});
