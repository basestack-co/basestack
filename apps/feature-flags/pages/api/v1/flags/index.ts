import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { getAllFlagsBySlugs } from "libs/prisma/utils/flag";
// Utils
import Cors from "cors";
import { withCors, withHeaders } from "@basestack/utils";
// Middlewares
import withRateLimit from "utils/middleware/rateLimit";

// More at https://github.com/expressjs/cors
const cors = Cors({
  methods: ["GET"],
  origin: process.env.API_ACCESS_CONTROL_ALLOW_ORIGIN ?? "*",
  optionsSuccessStatus: 200,
});

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
          message: error.message ?? "Something went wrong",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({
        code: 405,
        error: true,
        message: `The HTTP method is not supported at this route.`,
      });
  }
};

export default withCors(
  cors,
  withRateLimit(withHeaders(["x-project-key", "x-environment-key"], handler)),
);
