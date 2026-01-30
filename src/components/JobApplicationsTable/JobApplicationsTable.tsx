import { columns } from "./columns"
import { DataTable } from "./data-table"
import { prisma } from "@/src/db/client"

interface Props {
	userId: string
}

const JobApplicationsTable = async ({ userId }: Props) => {
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
		<div className="mx-auto py-10 container">
			<DataTable columns={columns} data={jobApplications} />
		</div>
	)
}

export default JobApplicationsTable
