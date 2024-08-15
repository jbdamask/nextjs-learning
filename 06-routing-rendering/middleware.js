import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.next();
//   return NextResponse.rewrite(new URL("/", request.url));
// return NextResponse.redirect
}

export const config = {
  matcher: "/news",
};