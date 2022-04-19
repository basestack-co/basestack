// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Types
import { EnvironmentArgs } from "types/query/environments";
// Utils
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { somethingWentWrong } from "utils/responses";

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

export const createEnvironment = async (
  userId: string,
  data: EnvironmentArgs,
  res: NextApiResponse
) => {
  try {
    const checkUser = await prisma.project.findFirst({
      where: {
        users: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
    });

    // This user can create an environment in this project
    if (!isEmpty(checkUser)) {
      const environment = await prisma.environment.create({
        data: {
          name: data.name,
          slug: data.slug,
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
      throw new Error("You are not authorized to create an environment");
    }
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};
