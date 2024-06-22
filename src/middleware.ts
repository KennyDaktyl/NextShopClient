import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DEAFAULT_LOGIN_REDIRECT, authRoutes, protectedRoutes } from "@/routes";

export async function auth(request: NextRequest) {
	const { nextUrl } = request;
	const token = request.cookies.get("authjs.session-token")?.value;
	const isLoggedIn = !!token;
	const isApiAuthRoute = nextUrl.pathname.startsWith("/api");
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isProtectedRoutes = protectedRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoute) {
		return NextResponse.next();
	}

	// if (isAuthRoute) {
	// 	if (isLoggedIn) {
	// 		return NextResponse.redirect(new URL(DEAFAULT_LOGIN_REDIRECT, nextUrl).toString());
	// 	}
	// 	return NextResponse.next();
	// }
	// console.log({
	// 	isLoggedIn: isLoggedIn,
	// 	url: request.nextUrl.pathname,
	// 	request: request.headers.get("referer"),
	// 	if: !isLoggedIn && isProtectedRoutes,
	// });
	// if (!isLoggedIn && isProtectedRoutes) {
	// 	console.log("Redirecting to login page");
	// 	return NextResponse.redirect(new URL("/auth/login", nextUrl).toString());
	// }

	return null;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export default auth;
