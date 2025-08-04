import { type PrismaClient, Role } from ".prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

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
