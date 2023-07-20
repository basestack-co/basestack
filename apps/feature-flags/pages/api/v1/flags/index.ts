import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { getAllFlagsBySlugs } from "libs/prisma/utils/flag";
// Utils
import { methodNotAllowed, somethingWentWrong } from "utils/responses";
import { getValue } from "@basestack/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const projectKey = req.headers["x-project-key"] as string;
        const envKey = req.headers["x-environment-key"] as string;

        if (!projectKey || !envKey) {
          return res.status(400).json({
            error: "Missing Project Key or Environment Key in headers",
          });
        }

        // Get flags by project slug and env slug
        const flags = await getAllFlagsBySlugs(projectKey, envKey);

        res.status(200).json({
          flags,
        });
      } catch (error) {
        return res.status(getValue(error, "code", 400) as number).json({
          error: true,
          message: getValue(error, "message", somethingWentWrong),
        });
      }
      break;

    default:
      res.status(405).json(methodNotAllowed);
  }
};

export default handler;
