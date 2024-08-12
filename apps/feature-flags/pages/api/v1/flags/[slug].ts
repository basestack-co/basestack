import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { getFlagBySlug } from "libs/prisma/utils/flag";
// Utils
import Cors from "cors";
import { withCors, withHeaders } from "@basestack/utils";

// More at https://github.com/expressjs/cors
const cors = Cors({
  methods: ["GET"],
  origin: process.env.API_ACCESS_CONTROL_ALLOW_ORIGIN || "*",
  optionsSuccessStatus: 200,
});

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
  withHeaders(["x-project-key", "x-environment-key"], handler),
);
