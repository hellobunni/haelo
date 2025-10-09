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
        <h1 className="section-heading mb-12">
          The Mind Behind
          <br />
          the Magic.
        </h1>
        <div className="grid md:grid-cols-3 gap-8 text-gray-500 text-sm">
          <p>
            As a solo digital creator, I combine the roles of designer,
            developer, and strategist to offer a uniquely integrated and
            personal service.
          </p>
          <p>
            My focus is on partnering directly with clients to build beautiful,
            functional, and impactful digital experiences from the ground up.
          </p>
          <p>
            This lean approach ensures clear communication, deep collaboration,
            and a final product that truly reflects your vision.
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
          Who I Am
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-3xl md:text-5xl font-semibold leading-tight"
        >
          Matte Digital is a creative studio built on the belief that great
          design isn't just decoration—
          <span className="bg-periwinkle/30 px-2 rounded-md">
            it's the foundation of impactful brands.
          </span>{" "}
          I obsess over every detail, challenge the ordinary, and
          <span className="bg-periwinkle/30 px-2 rounded-md">
            create work that leaves a mark.
          </span>{" "}
          I take pride in working with startups, established brands, and
          innovators who understand
          <span className="bg-periwinkle/30 px-2 rounded-md">
            the power of good design.
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
        <h2 className="sub-heading mb-4">Let's Create Something That Lasts</h2>
        <Link href="/contact">
          <Button className="bg-white text-black font-bold text-lg px-8 py-6 rounded-full hover:bg-gray-200 mt-4">
            Start a project
          </Button>
        </Link>
      </motion.section>
    </motion.div>
  );
}
