import { PrismaClient } from "@prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

export const getUserInForm = async (
  prisma: PrismaClient,
  userId: string,
  formId: string,
) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const form = await tx.form.findFirst({
        where: {
          AND: [
            { id: formId },
            {
              users: {
                some: {
                  user: {
                    id: userId,
                  },
                },
              },
            },
          ],
        },
      });

      if (form) {
        const role = await tx.formOnUsers.findFirst({
          where: {
            formId,
            userId,
          },
          select: {
            role: true,
          },
        });

        return {
          ...form,
          role: role?.role ?? "USER",
        };
      }

      return null;
    });
  } catch {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
};
