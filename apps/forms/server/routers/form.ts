import { protectedProcedure, router } from "server/trpc";
// Utils
import { z } from "zod";
import { withRoles } from "@basestack/utils";
// Types
import { Role } from "@prisma/client";

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
      orderBy: {
        createdAt: "desc",
      },
    });

    return { forms };
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
      const authorized = withRoles(ctx.session.user.role!, [Role.ADMIN])(() =>
        ctx.prisma.form.create({
          data: {
            name: input.name,
          },
        }),
      );

      const project = await authorized();

      return { project };
    }),
});
