import { Field, FieldLabel } from "../ui/field"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select"

interface Props {
	label: string
	defaultValue?: string
	selectGroupLabel: string
	options: { value: string; label: string }[]
	placeholder?: string
	onValueChange(value: string): void
}

const SelectField = ({
	label,
	defaultValue,
	selectGroupLabel,
	options,
	placeholder,
	onValueChange,
}: Props) => {
	return (
		<Field>
			<FieldLabel>{label}</FieldLabel>
			<Select defaultValue={defaultValue} onValueChange={onValueChange}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>{selectGroupLabel}</SelectLabel>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	)
}

export default SelectField
