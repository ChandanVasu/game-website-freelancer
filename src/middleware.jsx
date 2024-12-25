import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  const url = request.nextUrl.clone();

  const loginCookie = request.cookies.get("login")?.value;

  // console.log("Login Cookie:", loginCookie);

  // if (loginCookie?.value === "true") {
  //   console.log("Login Success");
  //   if (url.pathname === "/login") {
  //     url.pathname = "/";
  //     return NextResponse.redirect(url);
  //   }
  // } else {
  //   console.log("Login Failed");
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  if (loginCookie) {
    try {
      console.log("Login Success");
      if (url.pathname === "/login") {
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } catch {
      console.log("Login Failed");
    }
  } else {
    console.log("Login Failed");
    if (url.pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Allow access to the login page if no auth token is present
    return NextResponse.next();
  }

  return response;
}
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
