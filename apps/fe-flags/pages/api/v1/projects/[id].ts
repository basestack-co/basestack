import type { NextApiRequest, NextApiResponse } from "next";
// DB
import {
  getProjectById,
  updateProjectById,
  deleteProjectById,
} from "libs/prisma/db/projects";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { unauthorized, methodNotAllowed } from "utils/responses";

const ProjectsById = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  const projectId = get(req, "query.id", "");

  switch (req.method) {
    // gets a project by id
    case "GET":
      await getProjectById(projectId, res);
      break;
    // updates a project by id
    case "PUT":
      await updateProjectById(
        {
          projectId,
          ...JSON.parse(req.body),
        },
        res
      );
      break;
    // deletes a project by id
    case "DELETE":
      await deleteProjectById(projectId, res);
      break;

    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default ProjectsById;
