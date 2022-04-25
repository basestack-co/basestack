// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Types
import { Pagination } from "types/query/generic";
import { CreateFlagArgs, UpdateFlagArgs } from "types/query/flags";
// Utils
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import {
  somethingWentWrong,
  notAuthorizedCreateFlag,
  notAuthorizedUpdateFlag,
} from "utils/responses";
// DB
import { getUserInProject } from "./users";

/**
 *
 * @param flagId
 * @param res
 * @returns gets the flag by id
 */
export const getFlagById = async (flagId: string, res: NextApiResponse) => {
  try {
    const flag = await prisma.flag.findFirst({
      where: {
        id: flagId,
      },
      include: {
        environment: true,
      },
    });

    res.status(200).json({
      ...flag,
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
 * @param projectId
 * @param envId
 * @param res
 * @param pagination
 * @returns get all the flags by project id and environment id
 */
export const getAllFlags = async (
  userId: string,
  projectId: string,
  envId: string,
  res: NextApiResponse,
  pagination?: Pagination
) => {
  try {
    const { skip = "0", take = "50" } = pagination;

    const flags = await prisma.environment.findMany({
      where: {
        AND: [
          {
            id: envId,
          },
          {
            project: {
              id: projectId,
              users: {
                some: {
                  user: {
                    id: userId,
                  },
                },
              },
            },
          },
        ],
      },
      select: {
        _count: {
          select: { flags: true },
        },
        flags: {
          skip: Number(skip),
          take: Number(take),
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            slug: true,
            description: true,
            enabled: true,
            payload: true,
            environmentId: true,
            expiredAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    res.status(200).json({
      flags: get(flags, "[0].flags", []),
      pagination: {
        skip: Number(skip),
        take: Number(take),
        total: get(flags, "[0]._count.flags", 0),
      },
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
 * @param projectId
 * @param envId
 * @param data
 * @param res
 * @returns create a new flag
 */
export const createFlag = async (
  userId: string,
  projectId: string,
  envId: string,
  data: CreateFlagArgs,
  res: NextApiResponse
) => {
  try {
    // checks if the user is in the project
    const user = await getUserInProject(userId, projectId);

    // This user can create an flag in this project
    if (!isEmpty(user)) {
      const flag = await prisma.flag.create({
        data: {
          slug: data.slug,
          environmentId: envId,
          enabled: data.enabled,
          payload: data.payload,
          expiredAt: data.expiredAt,
          description: data.description,
        },
      });

      res.status(200).json({
        flag,
      });
    } else {
      throw new Error(notAuthorizedCreateFlag);
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
 * @param flagId
 * @param data
 * @returns update a flag by id
 */
export const updateFlagById = async (
  res: NextApiResponse,
  userId: string,
  projectId: string,
  flagId: string,
  data: UpdateFlagArgs
) => {
  try {
    // checks if the user is in the project
    const user = await getUserInProject(userId, projectId);

    // This user can update an flag in this project
    if (!isEmpty(user)) {
      const flag = await prisma.flag.update({
        where: {
          id: flagId,
        },
        data: {
          description: data.description,
          enabled: data.enabled,
          expiredAt: data.expiredAt,
          payload: data.payload,
        },
      });

      res.status(200).json({
        ...flag,
      });
    } else {
      throw new Error(notAuthorizedUpdateFlag);
    }
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};
