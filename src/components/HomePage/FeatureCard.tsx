import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"

interface FeatureCardProps {
	icon: LucideIcon
	title: string
	description: string
	iconBgColor: string
	iconColor: string
	badge?: {
		text: string
		variant?: "default" | "secondary" | "destructive" | "outline"
		className?: string
	}
	children?: React.ReactNode
}

export default function FeatureCard({
	icon: Icon,
	title,
	description,
	iconBgColor,
	iconColor,
	badge,
	children,
}: FeatureCardProps) {
	return (
		<Card>
			<CardContent className="pt-6">
				<div
					className={`flex items-center ${
						badge ? "justify-between" : ""
					} mb-4`}>
					<div
						className={`flex items-center justify-center w-12 h-12 rounded-lg ${iconBgColor}`}>
						<Icon className={`w-6 h-6 ${iconColor}`} />
					</div>
					{badge && (
						<Badge
							variant={badge.variant || "default"}
							className={badge.className}>
							{badge.text}
						</Badge>
					)}
				</div>
				<h3 className="mb-2 font-semibold text-xl">{title}</h3>
				<p className="mb-3 text-muted-foreground">{description}</p>
				{children}
			</CardContent>
		</Card>
	)
}
