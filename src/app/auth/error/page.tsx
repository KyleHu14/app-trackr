"use client"

import { Button } from "@/src/components/ui/button"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"
import * as React from "react"

interface SearchParamsType {
	error?: string
	message?: string
}

interface AuthErrorPageProps {
	searchParams: Promise<SearchParamsType>
}

const AuthErrorPage = ({ searchParams }: AuthErrorPageProps) => {
	const { error, message } = React.use(searchParams)

	const getErrorMessage = () => {
		switch (error) {
			case "session_invalid":
				return "Your session has expired or is invalid. Please sign in again."
			case "missing_user_data":
				return "Your account is missing required information. Please contact support."
			case "unauthorized":
				return "You don't have permission to access this resource."
			default:
				return message || "An authentication error occurred. "
		}
	}

	const getErrorTitle = () => {
		switch (error) {
			case "session_invalid":
				return "Session Expired"
			case "missing_user_data":
				return "Account Issue"
			case "unauthorized":
				return "Access Denied"
			default:
				return "Authentication Error"
		}
	}

	return (
		<Card className="mx-auto my-52 w-full max-w-md">
			<CardHeader className="text-center">
				<div className="flex justify-center mb-4">
					<div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
						<AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
					</div>
				</div>
				<CardTitle className="font-semibold text-xl">
					{getErrorTitle()}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-gray-600 dark:text-gray-300 text-center">
					{getErrorMessage()}
				</p>
				<div className="flex justify-center">
					<Button asChild className="w-fit">
						<Link href="/" className="flex items-center gap-2">
							<Home className="w-4 h-4" />
							Go to Home
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default AuthErrorPage
