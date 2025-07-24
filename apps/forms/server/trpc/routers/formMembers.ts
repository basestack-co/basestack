// Types
import { Role } from ".prisma/client";
import { AppEnv, config, emailToId, Product } from "@basestack/utils";
// Vendors
import { qstash } from "@basestack/vendors";
import {
  createTRPCRouter,
  protectedProcedure,
  withFormRestrictions,
} from "server/trpc";
import { AppMode } from "utils/helpers/general";
// Utils
import { z } from "zod";

export const formMembersRouter = createTRPCRouter({
  list: protectedProcedure
    .use(withFormRestrictions({ roles: [] }))
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
    .use(withFormRestrictions({ roles: [] }))
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
      const externalCustomerId = emailToId(ctx.form.adminUserEmail);

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
          externalCustomerId,
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
  update: protectedProcedure
    .use(withFormRestrictions({ roles: [Role.ADMIN] }))
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
  delete: protectedProcedure
    .use(withFormRestrictions({ roles: [Role.ADMIN] }))
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
