import { motion } from 'motion/react'
import projectsData from "@/lib/data/projects.json";
import ProjectCard from '../blocks/ProjectCard';

const WorkSection = () => {
  const projects = projectsData.slice(0, 6); // Show first 6 projects

   return (
			<section className="py-32 px-6 bg-white">
				<div className="max-w-7xl mx-auto">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-sm uppercase tracking-widest text-light-red font-semibold mb-4">
							Portfolio
						</h2>
						<h3 className="text-4xl md:text-5xl font-bold text-gray-900">
							Selected Work
						</h3>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, index) => (
						<ProjectCard 
							key={project.title} 
							project={project} 
							variant="resume" 
							index={index}
						/>
					))}
					</div>
				</div>
			</section>

  )
}

export default WorkSection