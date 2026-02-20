"use client"

import { authClient } from "@/src/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const useClientSession = (redirectTo = "/auth/error") => {
	const router = useRouter()
	const { data: session, isPending } = authClient.useSession()

	useEffect(() => {
		const isValidSession = session && session.user
		if (!isPending && !isValidSession) {
			console.error("Session is missing")
			router.push(redirectTo)
			throw new Error("Session is missing")
		}
	}, [session, router, redirectTo, isPending])

	if (isPending) {
		return null
	}

	return session
}

export default useClientSession
