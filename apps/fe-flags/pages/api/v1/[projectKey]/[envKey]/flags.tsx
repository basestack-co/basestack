import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import prisma from "libs/prisma";
// Utils
import { methodNotAllowed, somethingWentWrong } from "utils/responses";
import get from "lodash.get";

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
    return res.status(get(error, "code", 400)).json({
      error: true,
      message: get(error, "message", somethingWentWrong),
    });
  }
};

const RestApiFlags = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const projectKey = get(req, "query.projectKey", "");
      const envKey = get(req, "query.envKey", "");

      // Get flags by project slug and env slug
      await getFlagsByProjectSlugAndEnvSlug(projectKey, envKey, res);
      break;

    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default RestApiFlags;
