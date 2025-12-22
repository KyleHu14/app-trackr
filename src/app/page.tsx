import {
	CheckCircle,
	Target,
	TrendingUp,
	BarChart3,
	Clock,
	MapPin,
	DollarSign,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import NavBar from "@/src/components/NavBar/NavBar"

export default function Home() {
	return (
		<div className="bg-linear-to-br from-slate-50 dark:from-slate-900 to-slate-100 dark:to-slate-800 min-h-screen">
			<NavBar />
			{/* Hero Section */}
			<main className="mx-auto px-4 container">
				<section className="py-16 md:py-24 text-center">
					<div className="flex justify-center mb-4">
						<Badge className="bg-green-600 hover:bg-green-700 px-4 py-1 text-white text-sm">
							✨ 100% Free to Start
						</Badge>
					</div>
					<h1 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-4xl md:text-6xl">
						Track Your Job Applications
						<span className="block text-blue-600">
							Like Never Before
						</span>
					</h1>
					<p className="mx-auto mb-8 max-w-3xl text-gray-600 dark:text-gray-400 text-xl">
						Stay organized, track your progress, and land your dream
						job with our intuitive application tracking platform.
						Never lose sight of an opportunity again.
					</p>
					<div className="flex sm:flex-row flex-col justify-center gap-4">
						<Button size="lg" className="text-lg">
							Start Tracking for Free
						</Button>
						<Button variant="outline" size="lg" className="text-lg">
							Watch Demo
						</Button>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-16">
					<h2 className="mb-12 font-bold text-gray-900 dark:text-gray-100 text-3xl md:text-4xl text-center">
						Everything You Need to Land Your Next Job
					</h2>
					<div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
						<Card>
							<CardContent className="pt-6">
								<div className="flex justify-between items-center mb-4">
									<div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900 rounded-lg w-12 h-12">
										<BarChart3 className="w-6 h-6 text-blue-600" />
									</div>
									<Badge variant="secondary">Popular</Badge>
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									Application Analytics
								</h3>
								<p className="text-muted-foreground">
									Get insights into your job search with
									detailed analytics and progress tracking.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex justify-center items-center bg-green-100 dark:bg-green-900 mb-4 rounded-lg w-12 h-12">
									<CheckCircle className="w-6 h-6 text-green-600" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									Status Tracking
								</h3>
								<p className="mb-3 text-muted-foreground">
									Keep track of every application from
									submission to final decision.
								</p>
								<div className="flex flex-wrap gap-1">
									<Badge
										variant="outline"
										className="text-xs">
										Applied
									</Badge>
									<Badge
										variant="outline"
										className="text-xs">
										Interview
									</Badge>
									<Badge
										variant="outline"
										className="text-xs">
										Offer
									</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex justify-between items-center mb-4">
									<div className="flex justify-center items-center bg-purple-100 dark:bg-purple-900 rounded-lg w-12 h-12">
										<Clock className="w-6 h-6 text-purple-600" />
									</div>
									<Badge className="bg-purple-600 hover:bg-purple-700">
										New
									</Badge>
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									Interview Reminders
								</h3>
								<p className="text-muted-foreground">
									Never miss an interview with smart
									notifications and calendar integration.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex justify-center items-center bg-orange-100 dark:bg-orange-900 mb-4 rounded-lg w-12 h-12">
									<MapPin className="w-6 h-6 text-orange-600" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									Company Research
								</h3>
								<p className="text-muted-foreground">
									Store and organize research about companies
									and positions you&apos;re interested in.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex justify-center items-center bg-red-100 dark:bg-red-900 mb-4 rounded-lg w-12 h-12">
									<DollarSign className="w-6 h-6 text-red-600" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									Salary Tracking
								</h3>
								<p className="text-muted-foreground">
									Track salary ranges and negotiate better
									offers with comprehensive data.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex justify-center items-center bg-indigo-100 dark:bg-indigo-900 mb-4 rounded-lg w-12 h-12">
									<TrendingUp className="w-6 h-6 text-indigo-600" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									Success Metrics
								</h3>
								<p className="text-muted-foreground">
									Measure your job search success and improve
									your application strategy.
								</p>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-16">
					<div className="bg-blue-600 p-8 md:p-12 rounded-2xl text-center">
						<h2 className="mb-8 font-bold text-white text-3xl md:text-4xl">
							Join Thousands of Successful Job Seekers
						</h2>
						<div className="gap-8 grid grid-cols-2 md:grid-cols-4">
							<div>
								<div className="mb-2 font-bold text-white text-3xl md:text-4xl">
									10K+
								</div>
								<div className="text-blue-100">
									Applications Tracked
								</div>
							</div>
							<div>
								<div className="mb-2 font-bold text-white text-3xl md:text-4xl">
									2K+
								</div>
								<div className="text-blue-100">Jobs Landed</div>
							</div>
							<div>
								<div className="mb-2 font-bold text-white text-3xl md:text-4xl">
									95%
								</div>
								<div className="text-blue-100">
									User Satisfaction
								</div>
							</div>
							<div>
								<div className="mb-2 font-bold text-white text-3xl md:text-4xl">
									50+
								</div>
								<div className="text-blue-100">
									Company Partners
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 text-center">
					<h2 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-3xl md:text-4xl">
						Ready to Transform Your Job Search?
					</h2>
					<p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-400 text-xl">
						Start tracking your applications today and take control
						of your career journey.
					</p>
					<Button size="lg" className="text-lg">
						Get Started Free - No Credit Card Required
					</Button>
				</section>
			</main>

			{/* Footer */}
			<footer className="py-8 border-gray-200 dark:border-gray-700 border-t">
				<div className="mx-auto px-4 container">
					<div className="flex md:flex-row flex-col justify-between items-center">
						<div className="flex items-center space-x-2 mb-4 md:mb-0">
							<Target className="w-6 h-6 text-blue-600" />
							<span className="font-bold text-gray-900 dark:text-gray-100 text-xl">
								AppTrackr
							</span>
						</div>
						<div className="text-gray-600 dark:text-gray-400">
							© 2024 AppTrackr. All rights reserved.
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
