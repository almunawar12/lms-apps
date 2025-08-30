import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  //   if (request.nextUrl.pathname.startsWith("/profile")) {
  //     const signedAdmin = request.cookies.get("token");
  //     if (signedAdmin) {
  //       return NextResponse.next();
  //     } else {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   }
  //   if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //     const signedAdmin = request.cookies.get("token");
  //     if (signedAdmin) {
  //       return NextResponse.next();
  //     } else {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   } else {

  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/profile")
  ) {
    if (!token) {
      // Redirect ke login
      const url = new URL("/", request.url);
      // optional: simpan halaman asal di query param
      url.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
// }

export const config = {
  matcher: ["/:path*", "/portal/:path*"],
};
