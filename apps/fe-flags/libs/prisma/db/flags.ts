// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Types
import { Pagination } from "types/query/generic";
import { CreateFlagArgs } from "types/query/flags";
// Utils
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { somethingWentWrong, notAuthorizedCreateFlag } from "utils/responses";
// DB
import { getUserInProject } from "./users";

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

    // This user can create an environment in this project
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
