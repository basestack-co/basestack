import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getAllProjects } from "libs/prisma/db/projects";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";

const Projects = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json({
      error: true,
      message:
        "You must be sign in to view the protected content on this page.",
    });
  }

  switch (req.method) {
    case "GET":
      await getAllProjects(get(session, "user.id", "") as string, res);
      break;
    default:
      res.status(405).json({
        error: true,
        message: `The HTTP ${req.method} method is not supported at this route.`,
      });
  }
};

export default Projects;
