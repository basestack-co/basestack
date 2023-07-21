import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add the CORS headers to the response
  response.headers.append("Access-Control-Allow-Credentials", "true");
  response.headers.append(
    "Access-Control-Allow-Origin",
    process.env.ACCESS_CONTROL_ALLOW_ORIGIN!,
  );
  response.headers.append("Access-Control-Allow-Methods", "GET");
  response.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  return response;
}

export const config = {
  matcher: "/api/v1/:path*",
};
