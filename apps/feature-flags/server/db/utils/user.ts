import { PrismaClient, Role } from ".prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";
// Utils
import { PlanTypeId, Product } from "@basestack/utils";
// Polar
import { polarClient } from "libs/polar/client";

export const getUserInProject = async (
  prisma: PrismaClient,
  userId: string,
  projectId: string,
) => {
  try {
    const [user, admin] = await prisma.$transaction([
      prisma.projectsOnUsers.findFirst({
        where: {
          projectId,
          userId,
        },
        select: {
          role: true,
        },
      }),
      prisma.projectsOnUsers.findFirst({
        where: {
          projectId,
          role: Role.ADMIN,
        },
        select: {
          userId: true,
        },
      }),
    ]);

    const customer = await polarClient.customers.getStateExternal({
      externalId: admin?.userId!,
    });

    const subscription = customer?.activeSubscriptions.find(
      ({ metadata }) => metadata.product === Product.FLAGS,
    );

    return {
      role: user?.role ?? Role.VIEWER,
      adminUserId: admin?.userId ?? "",
      adminSubscriptionPlanId: (subscription?.metadata.planId ??
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
  teamId: string,
) => {
  try {
    const user = await prisma.teamMembers.findFirst({
      where: {
        teamId,
        userId,
      },
      select: {
        role: true,
      },
    });

    return {
      role: user?.role ?? Role.VIEWER,
    };
  } catch {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User not found or team not found",
      cause: "UserNotFoundInTeam",
    });
  }
};
