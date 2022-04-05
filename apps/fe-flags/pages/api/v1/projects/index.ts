import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getAllProjects } from "libs/prisma/db/projects";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { unauthorized, methodNotAllowed } from "../_utils/responses";

const Projects = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  switch (req.method) {
    case "GET":
      await getAllProjects(get(session, "user.id", "") as string, res);
      break;
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default Projects;
