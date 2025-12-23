import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"

const Dashboard = async () => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })

	return (
		<div>
			<h1>Session Information</h1>
			<p>Email: {session?.user.email}</p>
		</div>
	)
}

export default Dashboard
