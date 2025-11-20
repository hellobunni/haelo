"use client";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import FeaturedExperiments from "@/components/sections/labs/FeaturedExperiments/FeaturedExperiments";
import FeaturedProjects from "@/components/sections/labs/FeaturedProjects";
import FloatingOrb from "@/components/sections/labs/FloatingOrb";

const LabsPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Floating Orbs */}
        <FloatingOrb
          color="purple"
          size="400px"
          top="10%"
          left="10%"
          delay={0}
        />
        <FloatingOrb
          color="blue"
          size="300px"
          top="60%"
          right="15%"
          delay={2}
        />
        <FloatingOrb
          color="teal"
          size="250px"
          bottom="20%"
          left="50%"
          delay={4}
        />

        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">
                UI Engineering Playground
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-linear-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              A Playground for
            </span>
            <br />
            <span className="bg-linear-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Beautiful, Technical
            </span>
            <br />
            <span className="bg-linear-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Interfaces
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Explorations in AI, Web3, fintech, trading, collectibles, and
            advanced UI engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full bg-linear-to-r from-purple-500 via-blue-500 to-teal-500 text-white font-medium overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="relative">
        <FeaturedProjects />
      </section>

      {/* Experiments Preview */}
      <FeaturedExperiments />

      {/* About Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              About This Lab
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              This is my playground for experimental UI engineering — a space to
              explore complex interactions, motion-rich prototypes, and next-gen
              UX patterns across AI, Web3, fintech, trading, and entertainment.
            </p>
            <Link href="/resume">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-purple-500/20 to-teal-500/20 border border-purple-500/30 text-white font-medium hover:border-purple-500/50 transition-colors"
              >
                <span>Learn More About Me</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LabsPage;
