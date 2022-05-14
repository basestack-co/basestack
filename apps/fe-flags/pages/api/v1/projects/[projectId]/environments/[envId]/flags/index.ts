import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getAllFlags, createFlag } from "libs/prisma/db/flags";
// Middleware
import runAuthorizationMiddleware from "libs/middleware/authorization";
// Utils
import get from "lodash.get";
import { methodNotAllowed } from "utils/responses";

const Flags = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await runAuthorizationMiddleware(req, res);

  // const userId = get(session, "user.id", "") as string;
  const projectId = get(req, "query.projectId", "");
  const envId = get(req, "query.envId", "");

  switch (req.method) {
    // gets all the flags by project id and environment id
    case "GET":
      await getAllFlags(userId as string, projectId, envId, res, {
        skip: get(req, "query.skip", "0"),
        take: get(req, "query.take", "50"),
      });
      break;

    case "POST":
      await createFlag(envId, JSON.parse(req.body), res);
      break;
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default Flags;
