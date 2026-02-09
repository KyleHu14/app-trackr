"use client"

import { authClient } from "@/src/lib/auth-client"
import { useRouter } from "next/navigation"

const useClientSession = (redirectTo = "/auth/error") => {
	const router = useRouter()
	const { data: session } = authClient.useSession()

	if (!session || !session.user) {
		router.push(redirectTo)
		throw new Error("Session is missing")
	}

	return session
}

export default useClientSession
