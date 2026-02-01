"use client"

import { ColumnDef } from "@tanstack/react-table"
import { JobApplicationModel } from "@/prisma/generated/models"
import { Link as LinkIcon, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Status } from "@/prisma/generated/enums"
import { Button } from "@/src/components/ui/button"

interface HeaderProps {
	children: React.ReactNode
	className?: string
}
const Header = ({ children, className }: HeaderProps) => (
	<div className={`font-semibold text-gray-600 ${className}`}>{children}</div>
)

const statusMap: Record<Status, string> = {
	ACCEPTED: "Accepted",
	REJECTED: "Rejected",
	PENDING: "Pending",
	GHOSTED: "Ghosted",
}

export const columns: ColumnDef<JobApplicationModel>[] = [
	{
		accessorKey: "title",
		header: () => <Header>Job Title</Header>,
	},
	{
		accessorKey: "status",
		header: () => <Header>Status</Header>,
		cell: ({ row }) => {
			const status = row.getValue("status") as Status

			let colorClass
			if (status === "ACCEPTED") {
				colorClass = "text-green-800"
			} else if (status === "REJECTED") {
				colorClass = "text-red-800"
			} else if (status === "PENDING") {
				colorClass = "text-yellow-800"
			} else {
				colorClass = "text-gray-800"
			}

			return <span className={colorClass}>{statusMap[status]}</span>
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<Header className="flex items-center">
					Applied Date
					<ArrowUpDown
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}
						className="ml-2 w-4 h-4 hover:text-blue-500 cursor-pointer"
					/>
				</Header>
			)
		},
		cell: ({ row }) => {
			const date = new Date(row.getValue("createdAt"))
			const formattedDate = date.toLocaleDateString()
			return <span>{formattedDate}</span>
		},
	},
	{
		accessorKey: "updatedAt",
		header: () => <Header>Last Updated</Header>,
		cell: ({ row }) => {
			const date = new Date(row.getValue("createdAt"))
			const formattedDate = date.toLocaleDateString()
			return <span>{formattedDate}</span>
		},
	},
	{
		accessorKey: "url",
		header: () => <Header className="text-center">Application URL</Header>,
		cell: ({ row }) => {
			const url = row.getValue("url") as string
			return (
				<div className="flex justify-center">
					<Link href={url} className="inline-block w-4 h-4">
						<LinkIcon className="w-4 h-4 text-blue-500" />
					</Link>
				</div>
			)
		},
	},
]
