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
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import SelectField from "../Form/SelectField"
import { useRouter } from "next/navigation"
import { Session } from "@/src/lib/auth"

type JobApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "GHOSTED"

type Props = {
	session: Session
}

const selectStatusOptions = [
	{ value: "PENDING", label: "Pending" },
	{ value: "ACCEPTED", label: "Accepted" },
	{ value: "REJECTED", label: "Rejected" },
	{ value: "GHOSTED", label: "Ghosted" },
]

const CreateJobButton = ({ session }: Props) => {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const [isPending, startTransition] = useTransition()
	const [status, setStatus] = useState<JobApplicationStatus>("PENDING")

	const userId = session.user.id

	async function handleSubmit(formData: FormData) {
		const title = formData.get("title") as string
		const url = formData.get("url") as string
		const notes = formData.get("notes") as string
		const company = formData.get("company") as string

		if (!userId) {
			throw new Error("User not authenticated")
		}

		startTransition(async () => {
			const response = await createJobApplication({
				title,
				url,
				notes,
				status,
				userId,
				company,
			})

			if (response.result === "error") {
				throw new Error(
					response.message || "Failed to create job application",
				)
			}

			// Close modal on success
			setIsOpen(false)

			// Revalidate the dashboard page
			router.refresh()
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Create Job Application</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[25rem]">
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
						<FieldLabel>Company</FieldLabel>
						<Input
							type="text"
							id="company"
							name="company"
							required
							placeholder="Company Inc."
						/>
					</Field>

					<Field>
						<FieldLabel>Application URL</FieldLabel>
						<Input
							type="url"
							id="url"
							name="url"
							placeholder="https://company.com/jobs/123"
						/>
					</Field>

					<SelectField
						label="Status"
						selectGroupLabel="Statuses"
						options={selectStatusOptions}
						defaultValue="PENDING"
						onValueChange={(value: string) =>
							setStatus(value as JobApplicationStatus)
						}
					/>

					<Field>
						<FieldLabel>Notes (Optional)</FieldLabel>
						<Textarea
							id="notes"
							name="notes"
							rows={3}
							className="shadow-sm px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
							placeholder="Additional notes about this application..."
						/>
					</Field>

					<Button
						type="submit"
						disabled={isPending}
						className="w-full">
						{isPending
							? "Adding Job Application..."
							: "Add Job Application"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateJobButton
