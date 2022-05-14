import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getAllFlagsByProject } from "libs/prisma/db/flags";
// Middleware
import runAuthorizationMiddleware from "libs/middleware/authorization";
// Utils
import get from "lodash.get";
import { methodNotAllowed } from "utils/responses";

const FlagsByProject = async (req: NextApiRequest, res: NextApiResponse) => {
  await runAuthorizationMiddleware(req, res);

  const projectId = get(req, "query.projectId", "");

  switch (req.method) {
    // gets all the flags by project id
    case "GET":
      await getAllFlagsByProject(projectId, res, {
        skip: get(req, "query.skip", "0"),
        take: get(req, "query.take", "50"),
      });
      break;

    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default FlagsByProject;
