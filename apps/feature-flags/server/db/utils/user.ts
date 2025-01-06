import { PrismaClient } from ".prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

export const getUserInProject = async (
  prisma: PrismaClient,
  userId: string,
  projectId: string,
) => {
  try {
    const data = await prisma.projectsOnUsers.findFirst({
      where: {
        projectId,
        userId,
      },
      select: {
        role: true,
      },
    });

    if (!data) return null;

    return {
      role: data.role ?? "USER",
    };
  } catch {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
};
