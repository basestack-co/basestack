// Types
import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Utils
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import {
  notAuthorizedActionProject,
  somethingWentWrong,
} from "utils/responses";

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

/**
 *
 * @param res
 * @param projectId
 * @returns gets all the users by project id
 */
export const getAllUsersByProjectId = async (
  res: NextApiResponse,
  projectId: string
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        projects: {
          some: {
            project: {
              id: projectId,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};

/**
 *
 * @param res
 * @param search
 * @returns gets all the users by searching name
 */
export const getUsersBySearch = async (
  res: NextApiResponse,
  search: string
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          search,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};
