// Prisma
import prisma from "libs/prisma";
// Utils
import { notAuthorizedActionProject } from "utils/responses";

// Checks if user can do an action in this project like create, update, delete
export const getUserInProject = async (userId: string, projectId: string) => {
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
    throw new Error(notAuthorizedActionProject);
  }
};
