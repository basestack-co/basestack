// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Utils
import get from "lodash.get";

/**
 * @param userId
 * @param res
 * @returns Gets all the projects by user id
 */

export const getAllProjects = async (userId: string, res: NextApiResponse) => {
  try {
    const data = await prisma.project.findMany({
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
      data,
    });
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", "Something went wrong"),
    });
  }
};
