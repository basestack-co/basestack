import { PrismaClient } from ".prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

export const getUserInProject = async (
  prisma: PrismaClient,
  userId: string,
  projectId: string
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
          role: "ADMIN",
        },
        select: {
          userId: true,
        },
      }),
    ]);

    if (!user) return null;

    return {
      role: user.role ?? "VIEWER",
      adminUserId: admin?.userId ?? "",
    };
  } catch {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
};
