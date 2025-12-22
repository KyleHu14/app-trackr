interface StatCardProps {
	value: string
	label: string
}

export default function StatCard({ value, label }: StatCardProps) {
	return (
		<div>
			<div className="mb-2 font-bold text-white text-3xl md:text-4xl">
				{value}
			</div>
			<div className="text-blue-100">{label}</div>
		</div>
	)
}
