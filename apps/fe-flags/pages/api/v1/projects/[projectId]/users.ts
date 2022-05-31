import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getAllUsersByProjectId } from "libs/prisma/db/users";
// Middleware
import runAuthorizationMiddleware from "libs/middleware/authorization";
// Utils
import get from "lodash.get";
import { methodNotAllowed } from "utils/responses";

const UsersByProject = async (req: NextApiRequest, res: NextApiResponse) => {
  await runAuthorizationMiddleware(req, res);

  const projectId = get(req, "query.projectId", "");

  switch (req.method) {
    // gets all the users by project id
    case "GET":
      await getAllUsersByProjectId(res, projectId);
      break;

    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default UsersByProject;
