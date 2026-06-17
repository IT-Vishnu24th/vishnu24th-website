import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const session = request.cookies.get("session")?.value;

	// Redirect to login with protected routes callbackUrl
	if (!session) {
		const loginUrl = new URL("/", request.url);
		loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

// protected routes
export const config = {
	matcher: ["/profile/:path*"],
};
