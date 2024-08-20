// Types
import { PrismaClientType } from "libs/prisma";
// tRPC
import { TRPCError } from "@trpc/server";

export const getUserInForm = async (
  prisma: PrismaClientType,
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
      cacheStrategy: { swr: 60, ttl: 60 },
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
