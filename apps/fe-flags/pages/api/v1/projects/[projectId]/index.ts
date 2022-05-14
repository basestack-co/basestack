import type { NextApiRequest, NextApiResponse } from "next";
// DB
import {
  getProjectById,
  updateProjectById,
  deleteProjectById,
} from "libs/prisma/db/projects";
// Middleware
import runAuthorizationMiddleware from "libs/middleware/authorization";
// Utils
import get from "lodash.get";
import { methodNotAllowed } from "utils/responses";

const ProjectsById = async (req: NextApiRequest, res: NextApiResponse) => {
  await runAuthorizationMiddleware(req, res);

  const projectId = get(req, "query.projectId", "");

  switch (req.method) {
    // gets a project by id
    case "GET":
      await getProjectById(projectId, res);
      break;
    // updates a project by id
    case "PUT":
      await updateProjectById(
        projectId,
        get(JSON.parse(req.body), "name"),
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
