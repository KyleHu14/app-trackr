"use client"

import { Button } from "../../ui/button"
import { authClient } from "@/src/lib/auth-client"

const SignInButton = () => {
	const signIn = async () => {
		const data = await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
		})
	}

	return <Button onClick={signIn}>Sign In</Button>
}

export default SignInButton
