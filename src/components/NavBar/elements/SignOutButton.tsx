"use client"

import { Button } from "../../ui/button"
import { authClient } from "@/src/lib/auth-client"
import clsx from "clsx"
import { useRouter } from "next/navigation"

interface Props {
	/**
	 * If true, button will have no styling, no spacing, and serves as clickable text.
	 * Default = false.
	 */
	noStyling?: boolean
	className?: string
}

const SignOutButton = ({ noStyling = false, className }: Props) => {
	const router = useRouter()

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/")
					router.refresh()
				},
			},
		})
	}

	return (
		<Button
			variant={noStyling ? "ghost" : "default"}
			className={clsx(
				noStyling ? "m-0 p-0 h-fit w-fit justify-start" : "",
				className
			)}
			onClick={signOut}>
			Sign Out
		</Button>
	)
}

export default SignOutButton
