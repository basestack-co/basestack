import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getUserInProject } from "libs/prisma/db/users";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { unauthorized, unauthorizedUserInProject } from "utils/responses";

const authorizationMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  const userId = get(session, "user.id", "") as string;
  const projectId = get(req, "query.projectId", "");

  // checks if the user is in the project
  const isUserAllowedInProject = await getUserInProject(userId, projectId);

  // If the user does not exist in the project, return an error
  if (isEmpty(isUserAllowedInProject)) {
    return res.status(401).json(unauthorizedUserInProject);
  }

  return userId;
};

export default authorizationMiddleware;
