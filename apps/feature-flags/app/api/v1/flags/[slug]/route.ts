import { NextResponse } from "next/server";
// Prisma
import { getFlagBySlug } from "server/db/utils/flag";
// Utils
import { getMetadata } from "@basestack/utils";
import { verifyRequest } from "../utils";

export const dynamic = "auto";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Origin, Accept, X-Environment-Key, X-Project-Key",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const projectKey = req.headers.get("x-project-key");
    const environmentKey = req.headers.get("x-environment-key");

    if (!projectKey || !environmentKey) {
      return NextResponse.json(
        {
          error: true,
          message:
            "Missing required headers: x-project-key or x-environment-key",
        },
        { status: 400, headers },
      );
    }

    const referer = req.headers.get("referer") || "/";
    const metadata = getMetadata(req);

    const isAllowed = await verifyRequest(projectKey, referer, metadata);

    if (isAllowed) {
      const flag = await getFlagBySlug(projectKey, environmentKey, slug);

      if (!flag) {
        return NextResponse.json(
          {
            enabled: false,
            error: true,
            message: `Flag with slug ${slug} does not exist`,
          },
          { status: 404, headers },
        );
      }

      return NextResponse.json(flag, {
        status: 200,
        headers,
      });
    } else {
      return NextResponse.json(
        {
          error: true,
          message: "You are not allowed to access this resource.",
        },
        { status: 403, headers },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        message: "Something went wrong, please try again later.",
      },
      { status: error.code ?? 400, headers },
    );
  }
}
