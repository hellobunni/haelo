"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const approachSteps = [
  {
    title: "Discovery & Strategy",
    desc: "We start by understanding your brand, goals, and audience.",
  },
  {
    title: "Concept & Design",
    desc: "Crafting visual concepts and user-centric designs.",
  },
  {
    title: "Execution & Development",
    desc: "Bringing designs to life with clean, efficient code.",
  },
  {
    title: "Iteration & Refinement",
    desc: "Testing and refining to ensure a perfect final product.",
  },
];

const services = [
  {
    n: "01",
    title: "Web Design",
    desc1:
      "A great website is more than just aesthetics. We focus on creating a high-performance, user-centric experience that drives results.",
    desc2:
      "From wireframes to final polish, our designs are built to convert and impress, ensuring your digital storefront is flawless.",
    imageUrl:
      "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=2787&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "Development",
    desc1:
      "We write robust, modern code and build scalable websites. Our team stays on the cutting-edge of technology to deliver top performance.",
    desc2:
      "We focus on security, speed, and creating a seamless digital experience that works perfectly on all devices.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "UI/UX",
    desc1:
      "Intuitive design is invisible. We craft seamless user interfaces and experiences that guide, engage, and delight your audience.",
    desc2:
      "Our process involves deep research, user-testing, and iterative design to create products people love to use.",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2940&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "Consulting",
    desc1:
      "Leverage our expertise to make better digital decisions. We provide strategic guidance for your projects, ensuring they align with your business goals.",
    desc2:
      "From tech stack choices to market positioning, we partner with you to create a roadmap for long-term success.",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop",
  },
];

export default function ServicesPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-16"
    >
      <motion.section
        variants={itemVariants}
        className="py-24 max-w-7xl mx-auto"
      >
        <h1 className="section-heading mb-6">
          Crafting Brands with <br /> Design that Speaks
        </h1>
        <div className="grid md:grid-cols-2 gap-8 text-gray-600 mt-12">
          <p className="max-w-md">
            Good design is about more than aesthetics - it's about creating a
            connection. I build brands and digital experiences that are
            authentic and impactful.
          </p>
          <p className="max-w-md">
            From initial concept to final execution, my process is
            collaborative, transparent, and focused on delivering results that
            matter for your business.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="py-16 grid md:grid-cols-3 gap-16 items-start max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="sub-heading sticky top-32"
        >
          My
          <br />
          Approach
        </motion.h2>
        <div className="md:col-span-2 grid grid-cols-2 gap-x-8 gap-y-12">
          {approachSteps.map((step) => (
            <motion.div key={step.title} variants={itemVariants}>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="py-24 space-y-24 max-w-7xl mx-auto">
        {services.map((service) => (
          <motion.div
            key={service.n}
            className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-gray-500">{service.n}</p>
              <h3 className="list-item-heading">{service.title}</h3>
              <div className="grid sm:grid-cols-2 gap-8 text-gray-500 pt-4">
                <p>{service.desc1}</p>
                <p>{service.desc2}</p>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="overflow-hidden rounded-2xl aspect-square bg-gray-100 relative"
            >
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="my-16 py-16 bg-[#111] text-white rounded-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="sub-heading mb-4">See the Work in Action</h2>
          <p className="text-gray-400 mb-8">
            Check out our recent projects to see how we've helped brands like
            yours succeed.
          </p>
          <Link href="/work">
            <Button className="bg-white text-black font-bold text-lg px-8 py-6 rounded-full hover:bg-gray-200">
              View Our Work
            </Button>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
