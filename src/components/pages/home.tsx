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
  { n: "01", title: "Web Design", desc: "User-centric and beautiful designs." },
  {
    n: "02",
    title: "Development",
    desc: "Pixel-perfect and scalable solutions.",
  },
  {
    n: "03",
    title: "UI/UX",
    desc: "Intuitive interfaces and seamless user experiences.",
  },
  {
    n: "04",
    title: "Consulting",
    desc: "Strategic guidance to elevate your digital presence.",
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

const clients = [
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
          Elevate Beyond <br /> the Ordinary.
          <span aria-hidden="true">
            Elevate Beyond <br /> the Ordinary.
          </span>
        </motion.h1>
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
          Stand Out, Not Blend In
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-gray-600">
          I run a digital creative studio that partners with brands and
          individuals to create exceptional digital experiences.
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
                <p className="text-gray-600">{service.desc}</p>
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
        <motion.h2 variants={itemVariants} className="sub-heading mb-12">
          Selected Works
        </motion.h2>
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

      {/* Team */}
      <motion.section
        className="py-16 grid md:grid-cols-2 gap-8 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="sub-heading">
          A Creator That's Anything But Ordinary
        </motion.h2>
        <motion.div variants={itemVariants} className="relative h-64 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop"
            alt="Solopreneur"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover rounded-lg shadow-xl"
          />
        </motion.div>
      </motion.section>

      {/* Clients */}
      <motion.section
        className="py-24 mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.p variants={itemVariants} className="text-lg text-center mb-12">
          Working with clients who share my passion for quality is what drives
          me.
        </motion.p>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-8 items-center mx-auto w-full">
          {clients.map((client) => (
            <motion.div
              key={client}
              variants={itemVariants}
              className="text-center text-xl font-bold text-gray-400 grayscale hover:grayscale-0 transition-all"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="my-16 py-24 bg-periwinkle text-white rounded-2xl text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="sub-heading mb-4">Let's Create Something That Lasts</h2>
        <p className="mb-8 max-w-xl mx-auto">
          Get in touch with us today to discuss your project.
        </p>
        <Link href="/contact">
          <Button className="bg-white text-black font-bold text-lg px-8 py-6 rounded-full hover:bg-gray-200">
            Start a project
          </Button>
        </Link>
      </motion.section>
    </motion.div>
  );
}
