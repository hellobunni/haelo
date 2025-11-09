"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 15, stiffness: 100 },
  },
};

const services = [
  {
    n: "01",
    title: "Web & Interface Design",
    desc: "Intuitive, elegant UI that feels luxe and functions flawlessly.",
  },
  {
    n: "02",
    title: "Engineering & Development",
    desc: "Built with Next.js, TypeScript & Tailwind for scalable, performance-driven builds.",
  },
  {
    n: "03",
    title: "UX Strategy & Research",
    desc: "User journeys informed by data, crafted for conversion and delight.",
  },
  {
    n: "04",
    title: "Digital Consulting",
    desc: "Custom roadmaps, process optimisation & tech strategy for growing brands.",
  },
];

const projects = [
  {
    title: "Fanatics",
    category: "Design System / Front-End Development",
    imageUrl:
      "https://techcrunch.com/wp-content/uploads/2022/04/Fanatics-Image--e1649282414802.jpg?q=80&w=2940&auto=format&fit=crop", // clean dev setup / team collab feel
  },
  {
    title: "The Red Tent",
    category: "E-Commerce Design",
    imageUrl:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2787&auto=format&fit=crop", // feminine wellness vibe, soft tones
  },
  {
    title: "Qualigence",
    category: "Corporate Web Redesign",
    imageUrl:
      "https://cdn.prod.website-files.com/6726611a981a6c6f0061fe1f/672be253d00c610deaaeeac5_OpenGraph.png?q=80&w=2787&auto=format&fit=crop", // professional workspace aesthetic
  },
  {
    title: "StockX",
    category: "UI / Dashboard Engineering",
    imageUrl:
      "https://images-wp.stockx.com/news/wp-content/uploads/2021/04/Blog-social-v1.jpg?q=80&w=2940&auto=format&fit=crop", // moody tech / sneaker-data feel
  },
];

const _clients = [
  "StockX",
  "Fanatics",
  "Rocket Mortgage",
  "Benzinga",
  "Qualigence",
  "Detroit Flower Co",
];

export default function HomePage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12"
    >
      {/* Hero */}
      <section className="py-24 md:py-32 px-12 shadow-xl rounded-2xl">
        <motion.h1 variants={itemVariants} className="layered-heading">
          Haelo Studio
          <span aria-hidden="true">Haelo Studio</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl font-light mt-8 max-w-4xl"
        >
          We craft elevated digital experiences for premium brands.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-light mt-4 max-w-3xl text-gray-600"
        >
          Refined design. Smart engineering. Lasting impact.
        </motion.p>
      </section>

      {/* Intro */}
      <motion.section
        className="py-16 grid md:grid-cols-2 gap-8 items-end"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="sub-heading">
          What We Offer
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-gray-600">
          Boutique digital-engineering studio blending aesthetics + tech to
          build brands that stand out.
        </motion.p>
      </motion.section>

      {/* Services */}
      <motion.section
        className="py-16 border-t border-[var(--border)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {services.map((service) => (
          <motion.div
            key={service.n}
            variants={itemVariants}
            className="group py-8 border-b border-[var(--border)]"
          >
            <Link
              href="/services"
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-4 md:gap-8 w-2/3">
                <span className="text-sm text-gray-500">{service.n}</span>
                <h3 className="list-item-heading">{service.title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-gray-600 text-sm text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  {service.desc}
                </p>
                <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* Works */}
      <motion.section
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="sub-heading mb-4">
          Selected Works
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 mb-12 max-w-3xl"
        >
          Each project reflects our signature blend of elegance + engineering —
          crafted for clients who demand more than ordinary.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Link href="/work" className="group block">
                <div className="overflow-hidden rounded-xl mb-4 bg-gray-100 relative h-96">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="h-full w-full"
                  >
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
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="py-24 bg-gray-50 rounded-2xl px-8 md:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="sub-heading mb-8">
          Why Choose Us
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl"
        >
          At Haelo Studio, we believe in more than pretty visuals — we build
          digital presence with intention.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mt-6"
        >
          Our clients trust us because we deliver clarity in design, precision
          in code, and dedication in execution. Boutique-studio vibe,
          agency-grade results.
        </motion.p>
      </motion.section>

      {/* Process */}
      <motion.section
        className="py-24 mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="sub-heading mb-12 text-center"
        >
          Our Process
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start mx-auto w-full max-w-7xl">
          <motion.div variants={itemVariants} className="text-left">
            <h3 className="text-4xl font-bold text-periwinkle mb-4">01</h3>
            <h4 className="text-xl font-bold mb-2">Discovery</h4>
            <p className="text-gray-600">
              We dive deep into your brand, goals, and user needs.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="text-left">
            <h3 className="text-4xl font-bold text-periwinkle mb-4">02</h3>
            <h4 className="text-xl font-bold mb-2">Design</h4>
            <p className="text-gray-600">
              Concept, iterate, refine until it aligns with your vision.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="text-left">
            <h3 className="text-4xl font-bold text-periwinkle mb-4">03</h3>
            <h4 className="text-xl font-bold mb-2">Build</h4>
            <p className="text-gray-600">
              Code with craftsmanship, test with precision, launch with
              confidence.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="text-left">
            <h3 className="text-4xl font-bold text-periwinkle mb-4">04</h3>
            <h4 className="text-xl font-bold mb-2">Optimize</h4>
            <p className="text-gray-600">
              Post-launch monitoring, tweaking, and scaling for growth.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="my-16 py-24 bg-periwinkle text-white rounded-2xl text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="sub-heading mb-4">
          Ready to elevate your digital presence?
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-lg">
          We're now onboarding select clients for Q1.
        </p>
        <Link href="/contact">
          <Button className="bg-white text-black font-bold text-lg px-8 py-6 rounded-full hover:bg-gray-200">
            Start your project →
          </Button>
        </Link>
      </motion.section>
    </motion.div>
  );
}
