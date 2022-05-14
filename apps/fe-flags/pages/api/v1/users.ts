import type { NextApiRequest, NextApiResponse } from "next";
// DB
import { getUsersBySearch } from "libs/prisma/db/users";
// Auth
import { getSession } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import {
  methodNotAllowed,
  unauthorized,
  notEmptySearchForUsers,
} from "utils/responses";

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (isEmpty(session)) {
    return res.status(401).json(unauthorized);
  }

  switch (req.method) {
    // gets all the users by search
    case "GET":
      const name = get(req, "query.name", "");

      if (isEmpty(name)) {
        return res.status(404).json(notEmptySearchForUsers);
      }

      await getUsersBySearch(res, name);
      break;

    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default Users;
