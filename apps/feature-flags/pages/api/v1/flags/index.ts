import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { getAllFlagsBySlugs } from "libs/prisma/utils/flag";
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
        // Get flags by project slug and env slug
        const flags = await getAllFlagsBySlugs(
          req.headers["x-project-key"] as string,
          req.headers["x-environment-key"] as string,
        );

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
      res.setHeader("Allow", ["GET"]);
      res.status(405).json(methodNotAllowed);
  }
};

export default withRateLimit(
  withHeaders(["x-project-key", "x-environment-key"], handler),
);
