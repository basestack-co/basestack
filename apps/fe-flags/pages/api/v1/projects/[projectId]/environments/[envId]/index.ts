import type { NextApiRequest, NextApiResponse } from "next";
// DB
import {
  updateEnvironmentById,
  deleteEnvironmentById,
} from "libs/prisma/db/environments";
// Middleware
import runAuthorizationMiddleware from "libs/middleware/authorization";
// Utils
import get from "lodash.get";
import { methodNotAllowed } from "utils/responses";

const EnvironmentsById = async (req: NextApiRequest, res: NextApiResponse) => {
  await runAuthorizationMiddleware(req, res);

  const environmentId = get(req, "query.envId", "");

  switch (req.method) {
    // updates a environment by id
    case "PUT":
      await updateEnvironmentById(
        res,
        environmentId,
        get(JSON.parse(req.body), "name"),
        get(JSON.parse(req.body), "description")
      );
      break;
    // deletes a environment by id
    case "DELETE":
      await deleteEnvironmentById(environmentId, res);
      break;
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default EnvironmentsById;
