import { PrismaClient } from "@prisma/client";
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

    return await prisma.$transaction(async (tx) => {
      const project = await tx.project.findFirst({
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

      if (project) {
        const role = await tx.projectsOnUsers.findFirst({
          where: {
            projectId: project.id,
            userId,
          },
          select: {
            role: true,
          },
        });

        return {
          ...project,
          role: role?.role ?? "USER",
        };
      }

      return null;
    });
  } catch {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
};
