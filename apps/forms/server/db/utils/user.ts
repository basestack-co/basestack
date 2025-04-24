import { PrismaClient } from ".prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

export const getUserInForm = async (
  prisma: PrismaClient,
  userId: string,
  formId: string
) => {
  try {
    const [user, admin] = await prisma.$transaction([
      prisma.formOnUsers.findFirstOrThrow({
        where: {
          formId,
          userId,
        },
        select: {
          role: true,
        },
      }),
      prisma.formOnUsers.findFirstOrThrow({
        where: {
          formId,
          role: "ADMIN",
        },
        select: {
          userId: true,
        },
      }),
    ]);

    return {
      role: user.role ?? "VIEWER",
      adminUserId: admin?.userId ?? "",
    };
  } catch {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
};
