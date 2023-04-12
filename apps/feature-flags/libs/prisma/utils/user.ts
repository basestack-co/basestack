import { PrismaClient, Prisma } from "@prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

export const getUserInProject = async (
  prisma: PrismaClient,
  userId: string,
  projectId: string,
  projectSlug: string
) => {
  try {
    const condition = !!projectId ? { id: projectId } : { slug: projectSlug };

    return await prisma.project.findFirst({
      where: {
        AND: [
          condition,
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
