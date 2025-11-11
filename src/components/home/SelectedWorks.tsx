"use client";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import contentData from "@/lib/data/content.json";
import projectsData from "@/lib/data/projects.json";
import { Button } from "../ui/button";

export default function SelectedWorks() {
  const { home } = contentData;
  // Get first 3 projects for the mini version
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section className="py-32 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {home.selectedWorks.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {home.selectedWorks.description}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Link
                href={project.url || "#"}
                target={project.url ? "_blank" : undefined}
                rel={project.url ? "noopener noreferrer" : undefined}
                className="block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:border-periwinkle-200">
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    {project.screenshotUrl ? (
                      <Image
                        src={project.screenshotUrl}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-contain p-8"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl">
                        <ExternalLink className="w-4 h-4 text-periwinkle-600" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="px-3 py-1 rounded-full bg-periwinkle-50 text-periwinkle-700 text-xs font-medium">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold tetext-gray-900t-3 mb-2 group-hover:text-periwinkle-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button
            type="button"
            variant="periwinkle"
            className="rounded-md"
            href={home.selectedWorks.cta.href}
          >
            {home.selectedWorks.cta.text}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
