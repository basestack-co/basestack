import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getAllProjects, createProject } from "libs/prisma/db/projects";
// Auth
import { getSession } from "next-auth/react";
// Utils
import { methodNotAllowed, unauthorized } from "utils/responses";
import isEmpty from "lodash.isempty";
import get from "lodash.get";

const Projects = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  const userId = get(session, "user.id", "") as string;

  switch (req.method) {
    // gets all the projects
    case "GET":
      await getAllProjects(userId, res);
      break;
    // creates a new project
    case "POST":
      await createProject(userId, JSON.parse(req.body), res);
      break;
    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default Projects;
