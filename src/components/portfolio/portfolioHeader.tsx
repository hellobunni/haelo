import { ArrowRight, Linkedin } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { fadeInUp, stagger } from '@/lib/helpers/motion-variants'
import resumeData from '@/lib/data/resume.json'

const ResumeHeader = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { header } = resumeData;

	useEffect(() => {
		setIsVisible(true);
	}, []);

  return (
			<section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
				{/* Decorative Elements */}
				<div className="absolute top-20 right-10 w-72 h-72 bg-light-red/10 rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-10 w-96 h-96 bg-sandy-brown/10 rounded-full blur-3xl" />

				<motion.div
					className="max-w-5xl mx-auto text-center relative z-10"
					initial="hidden"
					animate={isVisible ? "visible" : "hidden"}
					variants={stagger}
					transition={{ staggerChildren: 0.1 }}
				>
					<motion.div
						variants={fadeInUp}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="mb-6"
					>
						<Badge className="bg-light-red/10 text-light-red border-light-red/30 px-4 py-1.5 text-sm font-medium">
							{header.badge}
						</Badge>
					</motion.div>

					<motion.h1
						variants={fadeInUp}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-light-red to-gray-900 bg-clip-text text-transparent"
					>
						{header.name}
					</motion.h1>

					<motion.p
						variants={fadeInUp}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="text-xl md:text-3xl text-gray-700 mb-4 font-light"
					>
						{header.title}
					</motion.p>

					<motion.p
						variants={fadeInUp}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
					>
						{header.description}
					</motion.p>

					<motion.div
						variants={fadeInUp}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="flex flex-wrap gap-4 justify-center items-center"
					>
						<Button
							size="lg"
							className="bg-light-red hover:bg-light-red/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
							href={header.buttons.primary.href}
						>
							{header.buttons.primary.text}
							<ArrowRight className="ml-2 w-5 h-5" />
						</Button>

						<Button
							size="lg"
							variant="outline"
							className="border-2 border-gray-300 hover:border-light-red px-8 py-6 text-lg rounded-xl transition-all duration-300"
							href={header.buttons.secondary.href}
						>
							<Linkedin className="mr-2 w-5 h-5" />
							{header.buttons.secondary.text}
						</Button>

					
					</motion.div>

					<motion.div
						variants={fadeInUp}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="mt-12 flex items-center justify-center gap-2 text-gray-500"
					>
						<div className="w-12 h-px bg-gray-300" />
						<span className="text-sm">{header.location}</span>
						<div className="w-12 h-px bg-gray-300" />
					</motion.div>
				</motion.div>
			</section>
  )
}

export default ResumeHeader