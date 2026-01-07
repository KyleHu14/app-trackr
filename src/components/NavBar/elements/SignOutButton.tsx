"use client"

import { Button } from "../../ui/button"
import { authClient } from "@/src/lib/auth-client"
import { useRouter } from "next/navigation"

const SignOutButton = () => {
	const router = useRouter()

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/")
				},
			},
		})
	}

	return <Button onClick={signOut}>Sign Out</Button>
}

export default SignOutButton
