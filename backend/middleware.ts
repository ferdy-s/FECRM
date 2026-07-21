import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "https://fecrm-fe.vercel.app",
];

export function middleware(request: NextRequest) {

  const origin = request.headers.get("origin") ?? "";

  const allowOrigin =
    allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0];

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowOrigin,
        "Access-Control-Allow-Methods":
          "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  const response = NextResponse.next();

  response.headers.set(
    "Access-Control-Allow-Origin",
    allowOrigin
  );

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );

  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  response.headers.set(
    "Access-Control-Allow-Credentials",
    "true"
  );

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
