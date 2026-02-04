import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const getServerSession = async () => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })

	if (!session) {
		throw new Error("No session found")
	}

	return session
}
