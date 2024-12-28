import { PrismaClient } from "@prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

export const getUserInForm = async (
  prisma: PrismaClient,
  userId: string,
  formId: string,
) => {
  try {
    const data = await prisma.formOnUsers.findFirstOrThrow({
      where: {
        formId,
        userId,
      },
      select: {
        role: true,
        form: {
          select: {
            id: true,
          },
        },
      },
    });

    if (data?.form) {
      return {
        ...data.form,
        role: data.role ?? "USER",
      };
    }

    return null;
  } catch {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
};
