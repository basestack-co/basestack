// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Types
import { EnvironmentArgs } from "types/query/environments";
// Utils
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import {
  somethingWentWrong,
  notAuthorizedCreateEnv,
  notAuthorizedUpdateEnv,
  notAuthorizedDeleteEnv,
} from "utils/responses";
// DB
import { getUserInProject } from "./users";

/**
 *
 * @param userId
 * @param projectId
 * @param NextApiResponse
 * @returns gets all the environments by project id
 */
export const getAllEnvironments = async (
  userId: string,
  projectId: string,
  res: NextApiResponse
) => {
  try {
    const environments = await prisma.project.findFirst({
      where: {
        id: projectId,
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
      select: {
        environments: true,
      },
    });

    res.status(200).json({
      environments: get(environments, "environments", []),
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
 * @param EnvironmentArgs
 * @param NextApiResponse
 * @returns creates a new environment by project id
 */

export const createEnvironment = async (
  userId: string,
  projectId: string,
  data: EnvironmentArgs,
  res: NextApiResponse
) => {
  try {
    // checks if the user is in the project
    const user = await getUserInProject(userId, projectId);

    // This user can create an environment in this project
    if (!isEmpty(user)) {
      const environment = await prisma.environment.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          project: {
            connect: {
              id: data.projectId,
            },
          },
        },
      });

      res.status(200).json({
        environment,
      });
    } else {
      throw new Error(notAuthorizedCreateEnv);
    }
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
 * @param userId
 * @param projectId
 * @param environmentId
 * @param name
 * @param description
 * @returns updates a environment by id
 */

export const updateEnvironmentById = async (
  res: NextApiResponse,
  userId: string,
  projectId: string,
  environmentId: string,
  name: string,
  description?: string
) => {
  try {
    // checks if the user is in the project
    const user = await getUserInProject(userId, projectId);

    // This user can update an environment in this project
    if (!isEmpty(user)) {
      const environment = await prisma.environment.update({
        where: {
          id: environmentId,
        },
        data: {
          name,
          description,
        },
      });

      res.status(200).json({
        environment,
      });
    } else {
      throw new Error(notAuthorizedUpdateEnv);
    }
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
 * @param projectId
 * @param environmentId
 * @param res
 * @returns deletes a environment by id
 */
export const deleteEnvironmentById = async (
  userId: string,
  projectId: string,
  environmentId: string,
  res: NextApiResponse
) => {
  try {
    // checks if the user is in the project
    const user = await getUserInProject(userId, projectId);

    // This user can update an environment in this project
    if (!isEmpty(user)) {
      const environment = await prisma.environment.delete({
        where: {
          id: environmentId,
        },
      });

      res.status(200).json({
        environment,
      });
    } else {
      throw new Error(notAuthorizedDeleteEnv);
    }
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};
