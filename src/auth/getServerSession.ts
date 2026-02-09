import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const getServerSession = async (redirectTo = "/auth/error") => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })

	// Handle missing session
	if (!session) {
		console.error("Session is missing")
		redirect(redirectTo)
	}

	// Validate required session data
	if (!session.user?.id) {
		console.error("Session missing required user ID", {
			userId: session.user?.id,
		})
		redirect(redirectTo)
	}

	return session
}
