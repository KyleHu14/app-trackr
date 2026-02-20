"use server"

import { prisma } from "@/src/db/client"
import { actionReturnType } from "./actionTypes"
import { JobApplicationUncheckedCreateInput } from "@/prisma/generated/models"
import { refresh } from "next/cache"

export const createJobApplication = async (
	newJobApplication: JobApplicationUncheckedCreateInput,
): Promise<actionReturnType> => {
	const { title, url, notes, status, userId, company } = newJobApplication

	try {
		await prisma.jobApplication.create({
			data: {
				title,
				url,
				notes: notes || null,
				status,
				userId: userId,
				company,
			},
		})

		refresh()
		return { result: "success" }
	} catch (error) {
		return { result: "error", message: `Failed to create job application.` }
	}
}

export const deleteJobApplication = async (
	id: string,
): Promise<actionReturnType> => {
	try {
		await prisma.jobApplication.delete({
			where: {
				id,
			},
		})

		refresh()
		return { result: "success" }
	} catch (error) {
		return { result: "error", message: `Failed to delete job application.` }
	}
}
