import { PrismaClient, Prisma } from "@prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

export const getUserInProject = async (
  prisma: PrismaClient,
  userId: string,
  projectId: string
) => {
  try {
    return await prisma.project.findFirst({
      where: {
        AND: [
          {
            id: projectId,
          },
          {
            users: {
              some: {
                user: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
    });
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
};
