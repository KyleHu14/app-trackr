import DeleteJobApplicationButton from "./DeleteJobApplicationButton"

interface Props {
	id: string
}

const Actions = ({ id }: Props) => {
	return (
		<div className="flex justify-center">
			<DeleteJobApplicationButton id={id} />
		</div>
	)
}

export default Actions
