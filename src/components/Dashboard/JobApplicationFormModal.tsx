"use client"

import { useState, useTransition } from "react"
import { Button } from "@/src/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog"
import { createJobApplication } from "@/src/actions/jobApplication"
import { authClient } from "@/src/lib/auth-client"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select"

const JobApplicationFormModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isPending, startTransition] = useTransition()
	const { data: session } = authClient.useSession()
	const userId = session?.user?.id

	async function handleSubmit(formData: FormData) {
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

		startTransition(async () => {
			try {
				const response = await createJobApplication({
					title,
					url,
					notes,
					status,
					userId,
				})

				if (response.result === "error") {
					throw new Error(
						response.message || "Failed to create job application",
					)
				}

				// Close modal on success
				setIsOpen(false)

				// Revalidate the dashboard page
				window.location.reload() // Simple approach for revalidation in client component
			} catch (error) {
				console.error("Error creating job application:", error)
				// You could add error state handling here
			}
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Create Job Application</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Track Job Application</DialogTitle>
					<DialogDescription>
						Add a job application to track its status and details.
					</DialogDescription>
				</DialogHeader>

				<form action={handleSubmit} className="space-y-4">
					<Field>
						<FieldLabel>Job Title</FieldLabel>
						<Input
							type="text"
							id="title"
							name="title"
							required
							placeholder="Frontend Developer"
						/>
					</Field>

					<Field>
						<FieldLabel>Application URL</FieldLabel>
						<Input
							type="url"
							id="url"
							name="url"
							required
							placeholder="https://company.com/jobs/123"
						/>
					</Field>

					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Statuses</SelectLabel>
								<SelectItem value="PENDING">Pending</SelectItem>
								<SelectItem value="ACCEPTED">
									Accepted
								</SelectItem>
								<SelectItem value="REJECTED">
									Rejected
								</SelectItem>
								<SelectItem value="GHOSTED">Ghosted</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

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
						disabled={isPending}
						className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full text-white transition-colors">
						{isPending ? "Creating..." : "Add Job Application"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default JobApplicationFormModal
