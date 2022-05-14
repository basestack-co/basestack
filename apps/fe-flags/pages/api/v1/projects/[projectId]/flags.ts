import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getAllFlagsByProject } from "libs/prisma/db/flags";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { unauthorized, methodNotAllowed } from "utils/responses";

const FlagsByProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  const userId = get(session, "user.id", "") as string;
  const projectId = get(req, "query.projectId", "");

  switch (req.method) {
    // gets all the flags by project id
    case "GET":
      await getAllFlagsByProject(projectId, res, {
        skip: get(req, "query.skip", "0"),
        take: get(req, "query.take", "50"),
      });
      break;

    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default FlagsByProject;
