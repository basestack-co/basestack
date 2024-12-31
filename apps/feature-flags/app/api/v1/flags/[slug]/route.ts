import { NextResponse } from "next/server";
// Prisma
import { getFlagBySlug } from "server/db/utils/flag";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
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
        { status: 400 },
      );
    }

    const flag = await getFlagBySlug(projectKey, environmentKey, slug);

    if (!flag) {
      return NextResponse.json(
        {
          enabled: false,
          error: true,
          message: `Flag with slug ${slug} does not exist`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(flag, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        message: error.message ?? "Something went wrong",
      },
      { status: error.code ?? 400 },
    );
  }
}
