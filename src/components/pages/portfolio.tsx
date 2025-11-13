"use client";

import { Coffee } from "lucide-react";
import WorkSection from "../portfolio/works";
import ResumeHeader from "../portfolio/portfolioHeader";
import AboutSection from "../portfolio/aboutSection";
import SkillsSection from "../portfolio/skillsSection";
import Experience from "../portfolio/experience";
import ResumeCTA from "../portfolio/resumeCTA";


export default function PortfolioPage() {

	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-orange-50/30">
			{/* Hero Section */}
		<ResumeHeader />
		<AboutSection />

		<SkillsSection />

<WorkSection />
		<Experience />

		<ResumeCTA />

			{/* Footer */}
			<footer className="py-8 px-6 bg-gray-900 text-center">
				<p className="text-gray-400 text-sm flex items-center justify-center gap-1">
					© 2025 Bryanna Gardner. Designed & Built with React + lots of{" "}
					<Coffee className="w-4 h-4 text-red-500 inline-block" />
				</p>
			</footer>
		</div>
	);
}

