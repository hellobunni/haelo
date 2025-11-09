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

export default function AboutPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-16"
    >
      <motion.div
        variants={itemVariants}
        className="max-w-5xl mx-auto text-left my-16"
      >
        <h1 className="section-heading mb-12">About Haelo Studio</h1>
        <div className="grid md:grid-cols-1 gap-8 text-gray-700 text-lg leading-relaxed">
          <p>
            Haelo Studio is led by full-stack engineer and designer Bryanna
            "Bree" Lynae. With a passion for UI/UX, high-performance builds, and
            aesthetic excellence, our studio is built for brands that value both
            form and function.
          </p>
          <p>
            Whether you're scaling up or starting new, we bring bespoke
            solutions, high-touch service, and a refined finish.
          </p>
          <p className="text-xl font-semibold text-periwinkle">
            Let's build your next chapter together.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="py-24 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8">
          Our Philosophy
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-3xl md:text-5xl font-semibold leading-tight"
        >
          At Haelo Studio, we believe in
          <span className="bg-periwinkle/30 px-2 rounded-md">
            more than pretty visuals
          </span>{" "}
          — we build digital presence with intention. Our clients trust us
          because we deliver
          <span className="bg-periwinkle/30 px-2 rounded-md">
            clarity in design, precision in code,
          </span>{" "}
          and dedication in execution.
          <span className="bg-periwinkle/30 px-2 rounded-md">
            Boutique-studio vibe, agency-grade results.
          </span>
        </motion.p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl mb-24 max-w-5xl mx-auto"
      >
        <div className="relative w-full h-[48rem] max-h-[70vh]">
          <Image
            src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2942&auto=format&fit=crop"
            alt="The founder"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

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
          <Button className="bg-white text-black font-bold text-lg px-8 py-6 rounded-full hover:bg-gray-200 mt-4">
            Start your project →
          </Button>
        </Link>
      </motion.section>
    </motion.div>
  );
}
