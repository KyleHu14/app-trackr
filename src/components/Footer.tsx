import { Target } from "lucide-react"

export default function Footer() {
	return (
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
	)
}
