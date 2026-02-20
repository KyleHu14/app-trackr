"use client"

import { deleteJobApplication } from "@/src/actions/jobApplication"
import { Trash2, Loader2 } from "lucide-react"
import { useState } from "react"

interface Props {
	id: string
}

const DeleteJobApplicationButton = ({ id }: Props) => {
	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = async () => {
		if (isDeleting) return // Prevent multiple clicks

		setIsDeleting(true)
		try {
			await deleteJobApplication(id)
			// Optionally add success feedback here
		} catch (error) {
			setIsDeleting(false)
			// Optionally add error feedback here
			console.error("Failed to delete job application:", error)
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<div className="cursor-pointer">
			{isDeleting ? (
				<Loader2 className="w-5 h-5 text-zinc-600 animate-spin" />
			) : (
				<Trash2
					className="text-zinc-600 hover:text-red-600 transition-colors"
					onClick={handleDelete}
				/>
			)}
		</div>
	)
}

export default DeleteJobApplicationButton
