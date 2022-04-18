// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Types
import { ProjectArgs } from "types/query/projects";
// Utils
import get from "lodash.get";
import { somethingWentWrong } from "utils/responses";

/**
 * @param userId
 * @param res
 * @returns  all the projects by user id
 */

export const getAllProjects = async (userId: string, res: NextApiResponse) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        users: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      projects,
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
 * @param userId
 * @param data
 * @param res
 * @returns
 */

export const createProject = async (
  userId: string,
  data: ProjectArgs,
  res: NextApiResponse
) => {
  try {
    const project = await prisma.project.create({
      data: {
        ...data,
      },
    });

    const connection = await prisma.projectsOnUsers.create({
      data: {
        project: {
          connect: {
            id: project.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json({
      project,
      connection,
    });
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};
