// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Types
import { HistoryAction } from "types/query/history";
// Utils
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { somethingWentWrong } from "utils/responses";

/**
 *
 * @param res
 * @param projectId
 * @param flagId
 * @returns gets all the history for a project or a flag
 */
export const getHistory = async (
  res: NextApiResponse,
  projectId: string,
  flagId?: string
) => {
  try {
    const getId = isEmpty(flagId)
      ? { projectId }
      : {
          payload: {
            path: ["flag", "id"],
            equals: flagId,
          },
        };

    const history = await prisma.history.findMany({
      where: {
        ...getId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      history,
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
 * @param projectId
 * @param action
 * @param payload
 * @returns creates a new history emtry
 */
export const createHistory = async (
  res: NextApiResponse,
  projectId: string,
  action: HistoryAction,
  payload: any
) => {
  try {
    const history = await prisma.history.create({
      data: {
        action,
        payload: JSON.stringify(payload),
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    res.status(200).json({
      ...history,
    });
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};
