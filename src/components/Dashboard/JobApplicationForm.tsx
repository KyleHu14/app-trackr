import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { createJobApplication } from "@/src/actions/jobApplication"
import { Button } from "../ui/button"

const JobApplicationForm = async () => {
	const requestHeaders = await headers()
	const session = await auth.api.getSession({ headers: requestHeaders })
	const userId = session?.user.id

	async function onSubmit(formData: FormData) {
		"use server"

		const title = formData.get("title") as string
		const url = formData.get("url") as string
		const notes = formData.get("notes") as string
		const status = formData.get("status") as
			| "PENDING"
			| "ACCEPTED"
			| "REJECTED"
			| "GHOSTED"

		if (!userId) {
			throw new Error("User not authenticated")
		}

		const response = await createJobApplication({
			title,
			url,
			notes,
			status,
			userId,
		})

		if (response.result === "error") {
			throw new Error(
				response.message || "Failed to create job application"
			)
		}

		revalidatePath("/dashboard")
	}

	return (
		<form action={onSubmit} className="space-y-4">
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

			<Button
				type="submit"
				className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full text-white transition-colors">
				Add Job Application
			</Button>
		</form>
	)
}

export default JobApplicationForm
