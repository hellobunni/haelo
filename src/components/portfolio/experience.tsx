"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import {
	CheckCircle2,
	CircleDot,
	Circle,
	type LucideIcon,
} from "lucide-react";
import resumeData from "@/lib/data/resume.json";
import { fadeInUp, stagger } from "@/lib/helpers/motion-variants";

// Helper function to parse period and extract start date in YYYY-MM-DD format
const parseStartDate = (period: string): string => {
	const monthMap: Record<string, string> = {
		JAN: "01",
		FEB: "02",
		MAR: "03",
		APR: "04",
		MAY: "05",
		JUN: "06",
		JUL: "07",
		AUG: "08",
		SEP: "09",
		OCT: "10",
		NOV: "11",
		DEC: "12",
	};

	const parts = period.split(" - ");
	if (parts.length === 0) return "2024-01-01";

	const startPart = parts[0].trim();
	const monthMatch = startPart.match(/^([A-Z]{3})/);
	const yearMatch = startPart.match(/(\d{4})/);

	if (monthMatch && yearMatch) {
		const month = monthMap[monthMatch[1]] || "01";
		const year = yearMatch[1];
		return `${year}-${month}-01`;
	}

	// Fallback: try to extract just the year
	const yearOnly = startPart.match(/(\d{4})/);
	if (yearOnly) {
		return `${yearOnly[1]}-01-01`;
	}

	return "2024-01-01";
};

// Icon array for variety
const icons: LucideIcon[] = [CheckCircle2, CircleDot, Circle];

// Color palette array for timeline icons
const timelineColors = [
	{
		bg: "bg-light-red",
		shadow: "shadow-light-red/50",
		text: "text-light-red",
	},
	{
		bg: "bg-sandy-brown",
		shadow: "shadow-sandy-brown/50",
		text: "text-sandy-brown",
	},
	{
		bg: "bg-earth-yellow",
		shadow: "shadow-earth-yellow/50",
		text: "text-earth-yellow",
	},
	{
		bg: "bg-cherry-blossom-pink",
		shadow: "shadow-cherry-blossom-pink/50",
		text: "text-cherry-blossom-pink",
	},
	{
		bg: "bg-fairy-tale",
		shadow: "shadow-fairy-tale/50",
		text: "text-fairy-tale",
	},
];

const Experience = () => {
	const { experience } = resumeData;
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<section className="py-32 px-6 bg-white">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-sm uppercase tracking-widest text-light-red font-semibold mb-4">
						{experience.label}
					</h2>
					<h3 className="text-4xl md:text-5xl font-bold text-gray-900">
						{experience.title}
					</h3>
				</motion.div>

				{/* Timeline Container */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={stagger}
					className="relative lg:block"
				>
					{/* Vertical Timeline Line */}
					<div className="absolute left-[140px] md:left-[160px] top-0 bottom-0 w-0.5 bg-slate-200 hidden lg:block z-0" />

					{/* Timeline Items */}
					<div className="space-y-8 md:space-y-12 lg:space-y-12">
						{experience.items.map((job, index) => {
							const Icon = icons[index % icons.length];
							const colors = timelineColors[index % timelineColors.length];
							const startDate = parseStartDate(job.period);
							const isHovered = hoveredIndex === index;
							const isLast = index === experience.items.length - 1;

							return (
								<motion.div
									key={index}
									variants={fadeInUp}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className="relative flex flex-col md:flex-row items-center lg:items-start gap-4 md:gap-2 lg:gap-2 group max-w-2xl mx-auto lg:max-w-none lg:mx-0"
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									{/* Date Column */}
									<div className="w-full md:w-24 lg:w-32 shrink-0 pt-0 md:pt-1.5 text-center md:text-left lg:text-left order-2 md:order-1">
										<motion.div
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
											viewport={{ once: true }}
											className="text-sm md:text-base text-slate-400 font-mono leading-0"
										>
											{startDate}
										</motion.div>
									</div>

									{/* Icon Column */}
									<div className="relative z-10 shrink-0 order-1 md:order-2">
										<motion.div
											whileHover={{ scale: 1.15 }}
											transition={{ type: "spring", stiffness: 400, damping: 17 }}
											className={`
												w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
												transition-all duration-300 border-2 border-white
												${isHovered
													? `${colors.bg} shadow-lg ${colors.shadow} scale-110`
													: colors.bg
												}
											`}
										>
											<Icon
												className={`
													w-5 h-5 md:w-6 md:h-6 text-white
													transition-transform duration-300
													${isHovered ? "scale-110" : ""}
												`}
											/>
										</motion.div>

										{/* Mobile Timeline Line */}
										{!isLast && (
											<div className="-z-20 absolute top-30 left-1/2 -translate-x-1/2 w-0.5 h-18 bg-slate-200 md:hidden" />
										)}
									</div>

									{/* Content Column */}
									<div className="flex-1 min-w-0 pb-8 md:pb-0 lg:pb-0 cursor-pointer text-center md:text-left lg:text-left order-3 w-full md:w-auto">
										<motion.div
											initial={{ opacity: 0, x: 20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
											viewport={{ once: true }}
										>
											{/* Title */}
											<h4
												className={`
													text-lg md:text-xl font-bold text-gray-900 mb-2
													transition-colors duration-300 leading-none
													${isHovered ? "text-gray-900" : ""}
												`}
											>
													{job.company}
											</h4>

											{/* Description - Company and Period */}
											<p className="text-sm md:text-base text-gray-600">
												{job.role}
											</p>

											{/* Achievements - Show on hover */}
											<motion.div
												initial={false}
												animate={{
													opacity: isHovered ? 1 : 0,
													height: isHovered ? "auto" : 0,
													marginTop: isHovered ? 12 : 0,
												}}
												transition={{ duration: 0.3, ease: "easeInOut" }}
												className="overflow-hidden"
											>
													<p className="text-sm md:text-base text-gray-600 italic">
												{job.period}
											</p>
												<ul className="space-y-2">
													{job.achievements.map((achievement, i) => (
														<motion.li
															key={i}
															initial={{ opacity: 0, x: -10 }}
															animate={{
																opacity: isHovered ? 1 : 0,
																x: isHovered ? 0 : -10,
															}}
															transition={{
																duration: 0.2,
																delay: i * 0.05,
															}}
															className="flex items-start gap-2 text-sm lg:text-base text-gray-700"
														>
															<span className={`${colors.text} mt-1.5 shrink-0`}>
																•
															</span>
															<span>{achievement}</span>
														</motion.li>
													))}
												</ul>
											</motion.div>
										</motion.div>
									</div>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Experience;
