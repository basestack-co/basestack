import { type PrismaClient, Role } from ".prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

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

export const getUserInProject = async (
  prisma: PrismaClient,
  userId: string,
  projectId: string,
) => {
  try {
    const [user, admin] = await prisma.$transaction([
      prisma.projectUsers.findFirst({
        where: {
          projectId,
          userId,
        },
        select: {
          role: true,
        },
      }),
      prisma.projectUsers.findFirst({
        where: {
          projectId,
          role: Role.ADMIN,
        },
        select: {
          userId: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
    ]);

    return {
      role: user?.role ?? Role.VIEWER,
      adminUserId: admin?.userId ?? "",
      adminUserEmail: admin?.user?.email ?? "",
    };
  } catch {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User not found or project not found",
      cause: "UserNotFoundInProject",
    });
  }
};
