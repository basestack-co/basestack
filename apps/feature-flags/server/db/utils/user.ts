import { PrismaClient, Role } from ".prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";
// Utils
import { PlanTypeId } from "@basestack/utils";

export const getUserInProject = async (
  prisma: PrismaClient,
  userId: string,
  projectId: string
) => {
  try {
    const [user, admin] = await prisma.$transaction([
      prisma.projectsOnUsers.findFirstOrThrow({
        where: {
          projectId,
          userId,
        },
        select: {
          role: true,
        },
      }),
      prisma.projectsOnUsers.findFirstOrThrow({
        where: {
          projectId,
          role: Role.ADMIN,
        },
        select: {
          userId: true,
          user: {
            select: {
              subscription: {
                select: {
                  planId: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return {
      role: user.role ?? Role.VIEWER,
      adminUserId: admin?.userId ?? "",
      adminSubscriptionPlanId: (admin?.user.subscription?.planId ??
        PlanTypeId.FREE) as PlanTypeId,
    };
  } catch {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User not found or project not found",
      cause: "UserNotFoundInProject",
    });
  }
};

export const getUserInTeam = async (
  prisma: PrismaClient,
  userId: string,
  teamId: string
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
