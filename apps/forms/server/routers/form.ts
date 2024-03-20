import { protectedProcedure, router } from "server/trpc";
// Utils
import { z } from "zod";
// Jobs
import { triggerClient, TriggerEventName } from "libs/trigger";

export const formRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId!;

    const forms = await ctx.prisma.form.findMany({
      where: {
        users: {
          some: {
            user: {
              externalId: userId,
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
      const userId = ctx.auth.userId!;

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
      const userId = ctx.auth.userId!;

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
                externalId: userId,
              },
            },
          },
        });

        // Trigger a job this is just an example delete this after we have real jobs
        await triggerClient.sendEvent({
          name: TriggerEventName.SEND_EMAIL,
          payload: {
            to: "vitor.works@gmail.com",
            subject: "New form created",
          },
        });

        return { form, connection };
      });
    }),
});
