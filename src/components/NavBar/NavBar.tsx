import { Target } from "lucide-react"
import Link from "next/link"
import SignInButton from "./elements/SignInButton"
import { headers } from "next/headers"
import { auth } from "@/src/lib/auth"
import UserButton from "./elements/UserButton/UserButton"

const NavBar = async () => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })

	return (
		<header className="border-b-2">
			<nav className="flex justify-between items-center mx-auto px-4 py-6 container">
				<Link href="/" className="flex items-center space-x-2">
					<Target className="w-8 h-8 text-blue-600" />
					<span className="font-bold text-gray-900 dark:text-gray-100 text-2xl">
						AppTrackr
					</span>
				</Link>

				<div className="flex items-center space-x-4">
					{!session ? <SignInButton /> : <UserButton />}
				</div>
			</nav>
		</header>
	)
}

export default NavBar
