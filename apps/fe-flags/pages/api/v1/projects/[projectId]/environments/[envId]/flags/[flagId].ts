import type { NextApiRequest, NextApiResponse } from "next";
// DB
import {
  getFlagById,
  updateFlagById,
  deleteFlagById,
} from "libs/prisma/db/flags";
// Middleware
import runAuthorizationMiddleware from "libs/middleware/authorization";
// Utils
import get from "lodash.get";
import { methodNotAllowed } from "utils/responses";

const FlagsById = async (req: NextApiRequest, res: NextApiResponse) => {
  await runAuthorizationMiddleware(req, res);

  const flagId = get(req, "query.flagId", "");

  switch (req.method) {
    // gets the flag by id
    case "GET":
      await getFlagById(flagId, res);
      break;

    // update a flag by id
    case "PUT":
      await updateFlagById(res, flagId, JSON.parse(req.body));
      break;
    // delete a flag by id
    case "DELETE":
      await deleteFlagById(res, flagId);
      break;
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default FlagsById;
