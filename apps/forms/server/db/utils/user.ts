import { PrismaClient, Role } from ".prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

export const getUserInForm = async (
  prisma: PrismaClient,
  userId: string,
  formId: string,
) => {
  try {
    const [user, admin] = await prisma.$transaction([
      prisma.formOnUsers.findFirst({
        where: {
          formId,
          userId,
        },
        select: {
          role: true,
        },
      }),
      prisma.formOnUsers.findFirst({
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
      role: user?.role ?? Role.VIEWER,
      adminUserId: admin?.userId ?? "",
    };
  } catch {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User not found or form not found",
      cause: "UserNotFoundInForm",
    });
  }
};

export const getUserInTeam = async (
  prisma: PrismaClient,
  userId: string,
  teamId: string,
) => {
  try {
    const user = await prisma.teamMembers.findFirstOrThrow({
      where: {
        teamId,
        userId,
      },
      select: {
        role: true,
      },
    });

    return {
      role: user.role ?? Role.VIEWER,
    };
  } catch {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User not found or team not found",
      cause: "UserNotFoundInTeam",
    });
  }
};
