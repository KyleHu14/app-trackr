"use client"

import { Target } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { authClient } from "@/src/lib/auth-client"

const NavBar = () => {
	const signIn = async () => {
		const data = await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
		})
	}

	return (
		<header className="border-b-2">
			<nav className="flex justify-between items-center mx-auto px-4 py-6 container">
				<div className="flex items-center space-x-2">
					<Target className="w-8 h-8 text-blue-600" />
					<span className="font-bold text-gray-900 dark:text-gray-100 text-2xl">
						AppTrackr
					</span>
				</div>
				<div className="flex items-center space-x-4">
					<Button variant="ghost" onClick={signIn}>
						Sign In
					</Button>
					<Button>Get Started</Button>
				</div>
			</nav>
		</header>
	)
}

export default NavBar
