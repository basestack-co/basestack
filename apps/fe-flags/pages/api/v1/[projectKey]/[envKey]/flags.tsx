import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Utils
import { methodNotAllowed, somethingWentWrong } from "utils/responses";
import { getValue } from "@basestack/utils";

export const getFlagsByProjectSlugAndEnvSlug = async (
  projectKey: string,
  envKey: string,
  res: NextApiResponse
) => {
  try {
    const flags = await prisma.flag.findMany({
      where: {
        environment: {
          key: envKey,
          project: {
            key: projectKey,
          },
        },
      },
      select: {
        slug: true,
        enabled: true,
        payload: true,
        expiredAt: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      flags,
    });
  } catch (error) {
    return res.status(getValue(error, "code", 400)).json({
      error: true,
      message: getValue(error, "message", somethingWentWrong),
    });
  }
};

const RestApiFlags = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const projectKey = getValue(req, "query.projectKey", "");
      const envKey = getValue(req, "query.envKey", "");

      // Get flags by project slug and env slug
      await getFlagsByProjectSlugAndEnvSlug(
        projectKey as string,
        envKey as string,
        res
      );
      break;

    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default RestApiFlags;
