import { NextResponse } from "next/server";

// Middleware to set a cookie
export function middleware(request) {
  // Create a new response by cloning the original request
  const response = NextResponse.next();

  const baseUrl = request.nextUrl.origin;

  response.cookies.set("baseUrl", baseUrl);

  return response;
}

// Middleware configuration
export const config = {
  matcher: "/:path*", // Apply the middleware to all paths
};
