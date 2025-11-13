"use client";
import { motion } from "motion/react";
import React from "react";
import resumeData from "@/lib/data/resume.json";

const AboutSection = () => {
	const { about } = resumeData;
	
	return (
		<section className="py-32 px-6 bg-white relative">
			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<h2 className="text-sm uppercase tracking-widest text-light-red font-semibold mb-4">
						{about.label}
					</h2>
					<h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
						{about.title}
					</h3>
					<div className="space-y-6 text-lg text-gray-700 leading-relaxed">
						{about.paragraphs.map((paragraph, index) => (
							<p
								key={index}
								className={
									index === about.paragraphs.length - 1 && about.lastParagraphClass
										? about.lastParagraphClass
										: ""
								}
							>
								{paragraph}
							</p>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default AboutSection;
