// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Types
import { ProjectArgs, UpdateProjectArgs } from "types/query/projects";
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
 * @returns creates a new project
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

/**
 *
 * @param projectId
 * @param res
 * @returns gets a project by id
 */
export const getProjectById = async (
  projectId: string,
  res: NextApiResponse
) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    res.status(200).json({
      project,
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
 * @param UpdateProjectArgs
 * @param res
 * @returns updates a project by id
 */
export const updateProjectById = async (
  { projectId, ...data }: UpdateProjectArgs,
  res: NextApiResponse
) => {
  try {
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data,
    });

    res.status(200).json({
      project,
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
 * @param projectId
 * @param res
 * @returns deletes a project by id
 */
export const deleteProjectById = async (
  projectId: string,
  res: NextApiResponse
) => {
  try {
    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    res.status(200).json({
      project,
    });
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};
