"use client";
import { Code, Palette, Award, Zap, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, stagger } from "@/lib/helpers/motion-variants";
import resumeData from "@/lib/data/resume.json";

const SkillsSection = () => {
	const { skills: skillsData } = resumeData;


	return (
		<section className="pt-20 pb-32 px-6 bg-linear-to-b from-white to-gray-50">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-sm uppercase tracking-widest text-light-red font-semibold mb-4">
						{skillsData.label}
					</h2>
					<h3 className="text-4xl md:text-5xl font-bold text-gray-900">
						{skillsData.title}
					</h3>
				</motion.div>

				{/* Tech Stack */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					viewport={{ once: true }}
					className="mt-20 text-center"
				>
					<h4 className="text-lg font-semibold text-gray-900 mb-6">
						{skillsData.techStack.title}
					</h4>
					<div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
						{skillsData.techStack.items.map((tech) => (
							<Badge
								key={tech}
								variant="outline"
								className="px-4 py-2 text-sm border-gray-300 hover:border-light-red hover:bg-fairy-tale transition-all duration-300"
							>
								{tech}
							</Badge>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default SkillsSection;
