import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { getFlagBySlug } from "libs/prisma/utils/flag";
// Utils
import { methodNotAllowed, somethingWentWrong } from "utils/helpers/responses";
// Middlewares
import withRateLimit from "utils/middleware/rateLimit";
import withHeaders from "utils/middleware/headers";
import withCors from "utils/middleware/cors";

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
      } catch (error: any) {
        return res.status(error.code ?? 400).json({
          error: true,
          message: error.message ?? somethingWentWrong,
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json(methodNotAllowed);
  }
};

export default withCors(
  withRateLimit(withHeaders(["x-project-key", "x-environment-key"], handler)),
);
