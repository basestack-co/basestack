import { NextResponse, NextRequest } from "next/server";
// Prisma
import { PrismaClient } from "@prisma/client/edge";
import { getAllFlagsBySlugs } from "libs/prisma/utils/flag";
// Utils
import { getValue } from "@basestack/utils";
import { methodNotAllowed, somethingWentWrong } from "utils/helpers/responses";
// Middlewares
import withRateLimit from "utils/middleware/rateLimit";
import withHeaders from "utils/middleware/headers";
import withCors from "utils/middleware/cors";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest) => {
  switch (req.method) {
    case "GET":
      try {
        const headers = new Headers();

        // Get flags by project slug and env slug
        const flags = await getAllFlagsBySlugs(
          headers.get("x-project-key") as string,
          headers.get("x-environment-key") as string,
        );

        return NextResponse.json({
          flags,
        });
      } catch (error) {
        return NextResponse.json({
          error: true,
          message: getValue(error, "message", somethingWentWrong),
        });
      }

    default:
      return NextResponse.json({
        error: true,
        message: methodNotAllowed,
      });
  }
};

export default handler;
