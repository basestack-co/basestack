import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { getFlagBySlug } from "libs/prisma/utils/flag";
// Utils
import { methodNotAllowed, somethingWentWrong } from "utils/responses";
import { getValue } from "@basestack/utils";
// Middlewares
import withRateLimit from "utils/middleware/rateLimit";
import withHeaders from "utils/middleware/headers";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const slug = req.query.slug as string;

        // Get flag by project key, env key and flag slug
        const flag = await getFlagBySlug(
          req.headers["x-project-key"] as string,
          req.headers["x-environment-key"] as string,
          slug,
        );

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
      res.setHeader("Allow", ["GET"]);
      res.status(405).json(methodNotAllowed);
  }
};

export default withRateLimit(
  withHeaders(["x-project-key", "x-environment-key"], handler),
);
