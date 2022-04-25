import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getFlagById, updateFlagById } from "libs/prisma/db/flags";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { unauthorized, methodNotAllowed } from "utils/responses";

const FlagsById = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  const userId = get(session, "user.id", "") as string;
  const projectId = get(req, "query.projectId", "");
  const envId = get(req, "query.envId", "");
  const flagId = get(req, "query.flagId", "");

  switch (req.method) {
    // gets the flag by id
    case "GET":
      await getFlagById(flagId, res);
      break;

    // update a flag by id
    case "PUT":
      await updateFlagById(
        res,
        userId,
        projectId,
        flagId,
        JSON.parse(req.body)
      );
      break;
    /* case "DELETE":
      await deleteEnvironmentById(userId, projectId, environmentId, res);
      break; */
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default FlagsById;
