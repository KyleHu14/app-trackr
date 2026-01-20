import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import JobApplicationList from "@/src/components/Dashboard/JobApplicationList"
import JobApplicationFormModal from "@/src/components/Dashboard/JobApplicationFormModal"

const Dashboard = async () => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })
	if (!session) {
		redirect("/")
	}

	return (
		<div className="mx-auto p-6 container">
			<div className="space-y-2 mb-8">
				<h1 className="font-bold text-3xl">Dashboard</h1>
				<p className="mt-1 text-gray-600">
					Welcome back, {session.user.name || session.user.email}
				</p>

				<JobApplicationFormModal />
			</div>

			<JobApplicationList />
		</div>
	)
}

export default Dashboard
