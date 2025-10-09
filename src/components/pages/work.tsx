"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const projects = [
  { title: "QuantumLeap", category: "Web Development", imageUrl: "https://images.unsplash.com/photo-1559028006-44a0a9949354?q=80&w=2940&auto=format&fit=crop" },
  { title: "AetherBranding", category: "Branding", imageUrl: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=2787&auto=format&fit=crop" },
  { title: "NovaUI", category: "Web Design", imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2787&auto=format&fit=crop" },
  { title: "ZenithOS", category: "Development", imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2940&auto=format&fit=crop" },
  { title: "Apex Industries", category: "Branding", imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2940&auto=format&fit=crop" },
  { title: "Momentum", category: "Web Development", imageUrl: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=2940&auto=format&fit=crop" },
];

export default function WorkPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-16">
      <motion.h1 variants={itemVariants} className="section-heading text-center my-16">
        Selected Works
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link href="#" className="group block">
              <div className="overflow-hidden rounded-xl mb-4 bg-gray-100 relative h-96">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="h-full w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-500">{project.category}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
