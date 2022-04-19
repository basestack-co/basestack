import type { NextApiRequest, NextApiResponse } from "next";
// DB
import {
  getAllEnvironments,
  createEnvironment,
} from "libs/prisma/db/environments";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { unauthorized, methodNotAllowed } from "utils/responses";

const Environments = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  const userId = get(session, "user.id", "") as string;
  const projectId = get(req, "query.projectId", "");

  switch (req.method) {
    // gets all the environments by project id
    case "GET":
      await getAllEnvironments(userId, projectId, res);
      break;
    // creates a new environment by project id
    case "POST":
      await createEnvironment(userId, JSON.parse(req.body), res);
      break;
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default Environments;
