// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Types
// import {  } from "types/query/environments";
// Utils
import get from "lodash.get";
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

    console.log(environments);

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
