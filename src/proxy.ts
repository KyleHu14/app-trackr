import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/src/lib/auth"

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Skip middleware for API routes and image routes
	if (
		pathname.startsWith("/api/") ||
		pathname.startsWith("/_next/") ||
		pathname.startsWith("/favicon.ico") ||
		pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/i)
	) {
		return NextResponse.next()
	}

	// Check if accessing dashboard routes
	if (pathname.startsWith("/dashboard")) {
		try {
			// Get session using the same method as in dashboard page
			const session = await auth.api.getSession({
				headers: request.headers,
			})

			// If no session exists, redirect to home page
			if (!session) {
				return NextResponse.redirect(new URL("/", request.url))
			}

			// Session exists, allow access to dashboard
			return NextResponse.next()
		} catch (error) {
			// If there's an error getting the session, redirect to home
			console.error("Auth error in middleware:", error)
			return NextResponse.redirect(new URL("/", request.url))
		}
	}

	// For all other routes, continue normally
	return NextResponse.next()
}

export const config = {
	// Apply middleware to all routes except those excluded in the function
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
}
