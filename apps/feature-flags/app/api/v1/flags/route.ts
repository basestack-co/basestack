import { NextResponse } from "next/server";
// Prisma
import { getAllFlagsBySlugs } from "server/db/utils/flag";

export async function GET(req: Request) {
  try {
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

    const flags = await getAllFlagsBySlugs(projectKey, environmentKey);

    return NextResponse.json({ flags }, { status: 200 });
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
