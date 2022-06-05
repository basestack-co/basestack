import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getFlagsByProjectSlugAndEnvSlug } from "libs/prisma/db/flags";
// Utils
import { methodNotAllowed } from "utils/responses";
import isEmpty from "lodash.isempty";
import get from "lodash.get";

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
