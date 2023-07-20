import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { getFlagBySlug } from "libs/prisma/utils/flag";
// Utils
import { methodNotAllowed, somethingWentWrong } from "utils/responses";
import { getValue } from "@basestack/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const projectKey = req.headers["x-project-key"] as string;
        const envKey = req.headers["x-environment-key"] as string;
        const slug = req.query.slug as string;

        if (!projectKey || !envKey) {
          return res.status(400).json({
            error: "Missing Project Key or Environment Key in headers",
          });
        }

        if (!slug) {
          return res.status(400).json({
            error: "Missing flag slug in query params",
          });
        }

        // Get flag by project key, env key and flag slug
        const flag = await getFlagBySlug(projectKey, envKey, slug);

        if (flag === null) {
          return res.status(404).json({
            enabled: false,
            error: true,
            message: `Flag with slug ${slug} does not exist`,
          });
        }

        res.status(200).json(flag);
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
