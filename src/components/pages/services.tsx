"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
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
    title: "Discovery",
    desc: "We dive deep into your brand, goals, and user needs.",
  },
  {
    title: "Design",
    desc: "Concept, iterate, refine until it aligns with your vision.",
  },
  {
    title: "Build",
    desc: "Code with craftsmanship, test with precision, launch with confidence.",
  },
  {
    title: "Optimize",
    desc: "Post-launch monitoring, tweaking, and scaling for growth.",
  },
];

const services = [
  {
    n: "01",
    title: "Web & Interface Design",
    desc1:
      "Intuitive, elegant UI that feels luxe and functions flawlessly.",
    desc2:
      "We create interfaces that don't just look beautiful—they guide users seamlessly through their journey, converting visits into meaningful actions.",
    imageUrl:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1472",
  },
  {
    n: "02",
    title: "Engineering & Development",
    desc1:
      "Built with Next.js, TypeScript & Tailwind for scalable, performance-driven builds.",
    desc2:
      "We write clean, maintainable code that powers fast, reliable digital experiences across all devices and platforms.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "UX Strategy & Research",
    desc1:
      "User journeys informed by data, crafted for conversion and delight.",
    desc2:
      "We dig deep into user behavior and needs to create experiences that feel natural, reduce friction, and drive measurable results.",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2940&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "Digital Consulting",
    desc1:
      "Custom roadmaps, process optimisation & tech strategy for growing brands.",
    desc2:
      "From choosing the right tech stack to defining your digital strategy, we provide expert guidance that aligns with your business goals and sets you up for sustainable growth.",
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
          What We Offer
        </h1>
        <div className="grid md:grid-cols-2 gap-8 text-gray-600 mt-12">
          <p className="max-w-md text-lg">
            Boutique digital-engineering studio blending aesthetics + tech to build brands that stand out.
          </p>
          <p className="max-w-md text-lg">
            From strategy to launch, we deliver elegant solutions that combine refined design with powerful engineering.
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
          Our
          <br />
          Process
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
        className="my-16 py-24 bg-periwinkle text-white rounded-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="sub-heading mb-4">Ready to elevate your digital presence?</h2>
          <p className="mb-8 text-lg">
            We're now onboarding select clients for Q1.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-black font-bold text-lg px-8 py-6 rounded-full hover:bg-gray-200">
              Start your project →
            </Button>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
