import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getAllFlags } from "libs/prisma/db/flags";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { unauthorized, methodNotAllowed } from "utils/responses";

const Flags = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  const userId = get(session, "user.id", "") as string;
  const envId = get(req, "query.envId", "");

  switch (req.method) {
    case "GET":
      await getAllFlags(envId, res, {
        skip: get(req, "query.skip", "0"),
        take: get(req, "query.take", "50"),
      });
      break;

    /*case "POST":
      await createEnvironment(userId, projectId, JSON.parse(req.body), res);
      break; */
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default Flags;
