import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { getAllFlagsBySlugs } from "libs/prisma/utils/flag";
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
        // Get flags by project slug and env slug
        const flags = await getAllFlagsBySlugs(
          req.headers["x-project-key"] as string,
          req.headers["x-environment-key"] as string,
        );

        res.status(200).json({
          flags,
        });
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
