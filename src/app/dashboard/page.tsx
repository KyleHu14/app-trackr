import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import JobApplicationList from "@/src/components/Dashboard/JobApplicationList"
import JobApplicationForm from "@/src/components/Dashboard/JobApplicationForm"

const Dashboard = async () => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })
	if (!session) {
		redirect("/")
	}

	return (
		<div className="mx-auto p-6 container">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-3xl">Dashboard</h1>
				<p className="text-gray-600">
					Welcome back, {session.user.name || session.user.email}
				</p>
			</div>

			{/* Create Job Application Form */}
			<div className="bg-white shadow mb-8 p-6 rounded-lg">
				<h2 className="mb-4 font-semibold text-xl">
					Track a Job Application
				</h2>
				<JobApplicationForm />
			</div>

			<JobApplicationList />
		</div>
	)
}

export default Dashboard
