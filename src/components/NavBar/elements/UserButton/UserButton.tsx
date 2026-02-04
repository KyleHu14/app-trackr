import { headers } from "next/headers"
import { auth } from "@/src/lib/auth"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Button } from "@/src/components/ui/button"
import SignOutButton from "../SignOutButton"

interface User {
	id: string
	name?: string
	email?: string
	image?: string
}

const UserButton = async () => {
	// Get user data server-side
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		})

		if (!session?.user) {
			return null
		}

		const user = session.user as User

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="relative p-0 rounded-full w-8 h-8">
						<Avatar className="w-8 h-8">
							<AvatarImage
								src={user.image || ""}
								alt={user.name || "User avatar"}
								referrerPolicy="no-referrer"
							/>
							<AvatarFallback>
								{user.name?.[0] || "U"}
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem className="cursor-pointer">
						<SignOutButton className="w-full" noStyling={true} />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	} catch (error) {
		return null
	}
}

export default UserButton
