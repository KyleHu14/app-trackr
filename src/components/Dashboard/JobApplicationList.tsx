import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/src/db/client"

const JobApplicationList = async () => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })

	const userId = session?.user.id

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
				Your Applications ({jobApplications.length})
			</h2>
			{jobApplications.length === 0 ? (
				<div className="p-6 text-gray-500 text-center">
					No job applications yet. Create your first one above!
				</div>
			) : (
				<div className="divide-y">
					{jobApplications.map((app) => (
						<div key={app.id} className="p-6">
							<div className="flex justify-between items-start mb-2">
								<h3 className="font-medium text-lg">
									{app.title}
								</h3>
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${
										app.status === "PENDING"
											? "bg-yellow-100 text-yellow-800"
											: app.status === "ACCEPTED"
												? "bg-green-100 text-green-800"
												: app.status === "REJECTED"
													? "bg-red-100 text-red-800"
													: "bg-gray-100 text-gray-800"
									}`}>
									{app.status.charAt(0) +
										app.status.slice(1).toLowerCase()}
								</span>
							</div>
							<a
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block mb-2 text-blue-600 hover:text-blue-800 text-sm">
								{app.url}
							</a>
							{app.notes && (
								<p className="mb-2 text-gray-600 text-sm">
									{app.notes}
								</p>
							)}
							<p className="text-gray-500 text-xs">
								Applied on{" "}
								{new Date(app.createdAt).toLocaleDateString()}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default JobApplicationList
