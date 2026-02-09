import { getServerSession } from "@/src/auth/getServerSession"
import JobApplicationList from "@/src/components/Dashboard/JobApplicationList"
import CreateJobButton from "@/src/components/Dashboard/CreateJobButton"

const Dashboard = async () => {
	const session = await getServerSession()

	return (
		<div className="mx-auto p-6 container">
			<div className="space-y-2 mb-8">
				<h1 className="font-bold text-3xl">Dashboard</h1>
				<p className="mt-1 text-gray-600">
					Welcome back, {session.user.name || session.user.email}
				</p>

				<CreateJobButton />
			</div>

			<JobApplicationList />
		</div>
	)
}

export default Dashboard
