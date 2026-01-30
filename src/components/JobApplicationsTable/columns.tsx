"use client"

import { ColumnDef } from "@tanstack/react-table"
import { JobApplicationModel } from "@/prisma/generated/models"

export const columns: ColumnDef<JobApplicationModel>[] = [
	{
		accessorKey: "title",
		header: "Job Title",
	},
	{
		accessorKey: "url",
		header: "Application URL",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "notes",
		header: "Notes",
	},
	{
		accessorKey: "createdAt",
		header: "Applied Date",
	},
	{
		accessorKey: "updatedAt",
		header: "Last Updated",
	},
]
