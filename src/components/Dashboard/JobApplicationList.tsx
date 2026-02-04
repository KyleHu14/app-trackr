import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/src/db/client"
import JobApplicationsTable from "../JobApplicationsTable/JobApplicationsTable"

const JobApplicationList = async () => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })

	const userId = session?.user.id

	if (!userId) {
		return <>Something went wrong</>
	}

	// Fetch user's job applications
	const jobApplications = await prisma.jobApplication.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	})

	return (
		<div className="bg-white shadow rounded-lg">
			<h2 className="p-6 border-b font-semibold text-xl">
				Your Applications
			</h2>
			{jobApplications.length === 0 ? (
				<div className="p-6 text-gray-500 text-center">
					No job applications yet. Create your first one above!
				</div>
			) : (
				<div className="p-5">
					<JobApplicationsTable userId={userId} />
				</div>
			)}
		</div>
	)
}

export default JobApplicationList
