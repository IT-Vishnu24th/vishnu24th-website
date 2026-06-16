import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	const { pathname } = request.nextUrl;

	const protectedRoutes = ["/profile"];
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route),
	);

	// Redirect to login with protected routes callbackUrl
	if (!session && isProtectedRoute) {
		const loginUrl = new URL("/", request.url);

		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/profile/:path*"],
};
