import { protectedProcedure, router } from "server/trpc";
import { TRPCError } from "@trpc/server";
// Types
import { Role } from "@prisma/client";
// Utils
import { z } from "zod";
import { withRoles } from "@basestack/utils";

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

    return await ctx.prisma.$transaction(async (tx) => {
      const forms = await tx.form.findMany({
        where: {
          users: {
            some: {
              user: {
                id: userId,
              },
            },
          },
        },
        skip: 0,
        take: 10,
        select: {
          id: true,
          name: true,
          isEnabled: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return await Promise.all(
        forms.map(async (form) => {
          const _count = await tx.submission.count({
            where: {
              formId: form.id,
            },
            select: {
              _all: true,
              viewed: true,
              isSpam: true,
            },
          });

          return {
            ...form,
            _count,
          };
        }),
      );
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
            select: {
              id: true,
              name: true,
              type: true,
              isEnabled: true,
              hasRetention: true,
              hasSpamProtection: true,
              hasDataQueryString: true,
              redirectUrl: true,
              successUrl: true,
              errorUrl: true,
              webhookUrl: true,
              blockIpAddresses: true,
              emails: true,
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
      restricted: true,
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
      const authorized = await withRoles(ctx.form.role, [Role.ADMIN])(() =>
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
