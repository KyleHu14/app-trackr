import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/src/db/client"
import { revalidatePath } from "next/cache"

async function createJobApplication(formData: FormData) {
	"use server"

	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })

	if (!session) {
		redirect("/")
	}

	const title = formData.get("title") as string
	const url = formData.get("url") as string
	const notes = formData.get("notes") as string
	const status = formData.get("status") as
		| "PENDING"
		| "ACCEPTED"
		| "REJECTED"
		| "GHOSTED"

	try {
		await prisma.jobApplication.create({
			data: {
				title,
				url,
				notes: notes || null,
				status,
				userId: session.user.id,
			},
		})

		revalidatePath("/dashboard")
	} catch (error) {
		console.error("Failed to create job application:", error)
		throw new Error("Failed to create job application")
	}
}

const Dashboard = async () => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })

	if (!session) {
		redirect("/")
	}

	// Fetch user's job applications
	const jobApplications = await prisma.jobApplication.findMany({
		where: {
			userId: session.user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
	})

	return (
		<div className="mx-auto p-6 container">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-3xl">
					Job Application Tracker
				</h1>
				<p className="text-gray-600">
					Welcome back, {session.user.name || session.user.email}
				</p>
			</div>

			{/* Create Job Application Form */}
			<div className="bg-white shadow mb-8 p-6 rounded-lg">
				<h2 className="mb-4 font-semibold text-xl">
					Add New Job Application
				</h2>
				<form action={createJobApplication} className="space-y-4">
					<div>
						<label
							htmlFor="title"
							className="block mb-2 font-medium text-gray-700 text-sm">
							Job Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							required
							className="shadow-sm px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
							placeholder="e.g. Frontend Developer"
						/>
					</div>

					<div>
						<label
							htmlFor="url"
							className="block mb-2 font-medium text-gray-700 text-sm">
							Application URL
						</label>
						<input
							type="url"
							id="url"
							name="url"
							required
							className="shadow-sm px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
							placeholder="https://company.com/jobs/123"
						/>
					</div>

					<div>
						<label
							htmlFor="status"
							className="block mb-2 font-medium text-gray-700 text-sm">
							Status
						</label>
						<select
							id="status"
							name="status"
							required
							className="shadow-sm px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
							<option value="PENDING">Pending</option>
							<option value="ACCEPTED">Accepted</option>
							<option value="REJECTED">Rejected</option>
							<option value="GHOSTED">Ghosted</option>
						</select>
					</div>

					<div>
						<label
							htmlFor="notes"
							className="block mb-2 font-medium text-gray-700 text-sm">
							Notes (Optional)
						</label>
						<textarea
							id="notes"
							name="notes"
							rows={3}
							className="shadow-sm px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
							placeholder="Additional notes about this application..."
						/>
					</div>

					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full text-white transition-colors">
						Add Job Application
					</button>
				</form>
			</div>

			{/* Job Applications List */}
			<div className="bg-white shadow rounded-lg">
				<div className="p-6 border-b">
					<h2 className="font-semibold text-xl">
						Your Applications ({jobApplications.length})
					</h2>
				</div>
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
									href={app.url}
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
									{new Date(
										app.createdAt
									).toLocaleDateString()}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Dashboard
