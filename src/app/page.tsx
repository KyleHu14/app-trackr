import {
	CheckCircle,
	TrendingUp,
	BarChart3,
	Clock,
	MapPin,
	DollarSign,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import FeatureCard from "@/src/components/HomePage/FeatureCard"
import StatCard from "@/src/components/HomePage/StatCard"

const features = [
	{
		icon: BarChart3,
		title: "Application Analytics",
		description:
			"Get insights into your job search with detailed analytics and progress tracking.",
		iconBgColor: "bg-blue-100 dark:bg-blue-900",
		iconColor: "text-blue-600",
		badge: { text: "Popular", variant: "secondary" as const },
	},
	{
		icon: CheckCircle,
		title: "Status Tracking",
		description:
			"Keep track of every application from submission to final decision.",
		iconBgColor: "bg-green-100 dark:bg-green-900",
		iconColor: "text-green-600",
		statusBadges: true,
	},
	{
		icon: Clock,
		title: "Interview Reminders",
		description:
			"Never miss an interview with smart notifications and calendar integration.",
		iconBgColor: "bg-purple-100 dark:bg-purple-900",
		iconColor: "text-purple-600",
		badge: { text: "New", className: "bg-purple-600 hover:bg-purple-700" },
	},
	{
		icon: MapPin,
		title: "Company Research",
		description:
			"Store and organize research about companies and positions you're interested in.",
		iconBgColor: "bg-orange-100 dark:bg-orange-900",
		iconColor: "text-orange-600",
	},
	{
		icon: DollarSign,
		title: "Salary Tracking",
		description:
			"Track salary ranges and negotiate better offers with comprehensive data.",
		iconBgColor: "bg-red-100 dark:bg-red-900",
		iconColor: "text-red-600",
	},
	{
		icon: TrendingUp,
		title: "Success Metrics",
		description:
			"Measure your job search success and improve your application strategy.",
		iconBgColor: "bg-indigo-100 dark:bg-indigo-900",
		iconColor: "text-indigo-600",
	},
]

const stats = [
	{ value: "10K+", label: "Applications Tracked" },
	{ value: "2K+", label: "Jobs Landed" },
	{ value: "95%", label: "User Satisfaction" },
	{ value: "50+", label: "Company Partners" },
]

export default function Home() {
	return (
		<>
			{/* Hero Section */}
			<section className="py-16 md:py-24 text-center">
				<div className="flex justify-center mb-4">
					<Badge className="bg-green-600 hover:bg-green-700 px-4 py-1 text-white">
						✨ 100% Free
					</Badge>
				</div>
				<h1 className="mb-6 font-bold text-4xl md:text-6xl">
					Track Your Job Applications
					<span className="block text-blue-600">
						Like Never Before
					</span>
				</h1>
				<p className="mx-auto mb-8 max-w-3xl text-muted-foreground text-xl">
					Stay organized, track your progress, and land your dream job
					with our intuitive application tracking platform. Never lose
					sight of an opportunity again.
				</p>
			</section>

			{/* Features Section */}
			<section className="py-16">
				<h2 className="mb-12 font-bold text-3xl md:text-4xl text-center">
					Everything You Need to Land Your Next Job
				</h2>
				<div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							iconBgColor={feature.iconBgColor}
							iconColor={feature.iconColor}
							badge={feature.badge}
						/>
					))}
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16">
				<div className="bg-blue-600 p-8 md:p-12 rounded-2xl text-center">
					<h2 className="mb-8 font-bold text-white text-3xl md:text-4xl">
						Join Thousands of Successful Job Seekers
					</h2>
					<div className="gap-8 grid grid-cols-2 md:grid-cols-4">
						{stats.map((stat, index) => (
							<StatCard
								key={index}
								value={stat.value}
								label={stat.label}
							/>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 text-center">
				<h2 className="mb-6 font-bold text-3xl md:text-4xl">
					Ready to Transform Your Job Search?
				</h2>
				<p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl">
					Start tracking your applications today and take control of
					your career journey.
				</p>
				<Button size="lg">
					Get Started Free - No Credit Card Required
				</Button>
			</section>
		</>
	)
}
