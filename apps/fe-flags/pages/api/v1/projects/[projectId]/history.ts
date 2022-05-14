import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getHistory, createHistory } from "libs/prisma/db/history";
// Auth
// Middleware
import runAuthorizationMiddleware from "libs/middleware/authorization";
// Utils
import get from "lodash.get";
import { methodNotAllowed } from "utils/responses";

const History = async (req: NextApiRequest, res: NextApiResponse) => {
  await runAuthorizationMiddleware(req, res);

  const projectId = get(req, "query.projectId", "");

  switch (req.method) {
    case "GET":
      const flagId = get(req, "query.flagId", "");
      // gets all the history for a project or a flag
      await getHistory(res, projectId, flagId);
      break;
    // creste a new history
    case "POST":
      await createHistory(
        res,
        projectId,
        get(JSON.parse(req.body), "action"),
        get(JSON.parse(req.body), "payload")
      );
      break;

    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default History;
