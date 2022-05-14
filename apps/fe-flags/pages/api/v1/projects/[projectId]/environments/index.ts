import type { NextApiRequest, NextApiResponse } from "next";
// DB
import {
  getAllEnvironments,
  createEnvironment,
} from "libs/prisma/db/environments";
// Middleware
import runAuthorizationMiddleware from "libs/middleware/authorization";
// Utils
import get from "lodash.get";
import { methodNotAllowed } from "utils/responses";

const Environments = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await runAuthorizationMiddleware(req, res);

  const projectId = get(req, "query.projectId", "");

  switch (req.method) {
    // gets all the environments by project id
    case "GET":
      await getAllEnvironments(userId as string, projectId, res);
      break;
    // creates a new environment by project id
    case "POST":
      await createEnvironment(JSON.parse(req.body), res);
      break;
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default Environments;
