import type { NextApiRequest, NextApiResponse } from "next";
// DB
import {
  updateEnvironmentById,
  deleteEnvironmentById,
} from "libs/prisma/db/environments";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { unauthorized, methodNotAllowed } from "utils/responses";

const EnvironmentsById = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  const userId = get(session, "user.id", "") as string;
  const projectId = get(req, "query.projectId", "");
  const environmentId = get(req, "query.envId", "");

  switch (req.method) {
    // updates a environment by id
    case "PUT":
      await updateEnvironmentById(
        res,
        userId,
        projectId,
        environmentId,
        get(JSON.parse(req.body), "name"),
        get(JSON.parse(req.body), "description")
      );
      break;
    // deletes a environment by id
    case "DELETE":
      await deleteEnvironmentById(userId, projectId, environmentId, res);
      break;
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default EnvironmentsById;
