// Types
import type { NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Types
import { Pagination } from "types/query/generic";
// Utils
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { somethingWentWrong } from "utils/responses";
// DB
import { getUserInProject } from "./users";

export const getAllFlags = async (
  envId: string,
  res: NextApiResponse,
  pagination?: Pagination
) => {
  try {
    const { skip = "0", take = "50" } = pagination;

    const flags = await prisma.flag.findMany({
      skip: Number(skip),
      take: Number(take),
      where: {
        environmentId: envId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      flags,
    });
  } catch (error) {
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};
