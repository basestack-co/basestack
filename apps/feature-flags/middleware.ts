import { NextRequest, NextResponse } from "next/server";
// Auth
import { createAuthClient } from "better-auth/client";

const client = createAuthClient();

export async function middleware(request: NextRequest) {
  const { data: session } = await client.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  });

  if (!session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/a/:path*", "/api/trpc/:path*"],
};
