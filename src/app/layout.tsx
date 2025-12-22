import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import NavBar from "@/src/components/NavBar/NavBar"
import Footer from "@/src/components/Footer"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "AppTrackr - Track Your Job Applications",
	description:
		"Stay organized, track your progress, and land your dream job with our intuitive application tracking platform.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-br from-slate-50 to-slate-300 dark:from-slate-900 dark:to-slate-800 min-h-screen`}>
				<NavBar />
				<main className="mx-auto px-4 container">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
