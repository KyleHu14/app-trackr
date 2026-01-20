import { Button } from "@/src/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog"
import JobApplicationForm from "./JobApplicationForm"

const JobApplicationFormModal = () => {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant="outline">Create Job Application</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Track Job Application</DialogTitle>
						<DialogDescription>
							Add a job application to track its status and
							details.
						</DialogDescription>
					</DialogHeader>

					<JobApplicationForm />
				</DialogContent>
			</form>
		</Dialog>
	)
}

export default JobApplicationFormModal
