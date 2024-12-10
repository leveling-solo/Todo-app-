import { NextResponse, NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
export async function middleware(request: NextRequest): Promise<any> {
  const token: JWT | null = await getToken({ req: request });
  const path: string = request.nextUrl.pathname;
  const isPublicPath: boolean = path === "/login";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/login", "/", "/planned", "/task", "/important"],
};
