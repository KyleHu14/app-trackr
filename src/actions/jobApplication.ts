"use server"

import { prisma } from "@/src/db/client"
import { actionReturnType } from "./actionTypes"
import { JobApplicationUncheckedCreateInput } from "@/prisma/generated/models"

export const createJobApplication = async (
	newJobApplication: JobApplicationUncheckedCreateInput
): Promise<actionReturnType> => {
	const { title, url, notes, status, userId } = newJobApplication

	try {
		await prisma.jobApplication.create({
			data: {
				title,
				url,
				notes: notes || null,
				status,
				userId: userId,
			},
		})

		return { result: "success" }
	} catch (error) {
		return { result: "error", message: `Failed to create job application.` }
	}
}
