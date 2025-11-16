"use client";
import { Beaker, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import ExperimentCard from "@/components/sections/labs/ExperimentCard/ExperimentCard";
import Container from "@/components/ui/container/container";
import { getAllExperiments } from "@/lib/data/labs-data";

export default function ExperimentsPage() {
  const experiments = getAllExperiments();

  return (
    <div className="relative min-h-screen py-20 px-6">
      <Container size="xl" paddingX="md" paddingY="none">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Beaker className="w-10 h-10 text-teal-400" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Experiments
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl">
            A collection of micro-interactions, motion studies, and UI patterns
            exploring the boundaries of web animation and interaction design.
          </p>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {experiments.map((experiment, index) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              index={index}
            />
          ))}
        </div>

        {/* Component Showcase Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Beaker className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Component Showcase</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/labs/experiments/components/glass-card">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 rounded-2xl bg-linear-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  GlassCard Component
                </h3>
                <p className="text-gray-400 text-sm">
                  Explore all variations of the accessible glassmorphism card
                  component with different blur intensities and states.
                </p>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-3xl bg-linear-to-br from-white/5 to-white/0 border border-white/10 text-center"
        >
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            More Coming Soon
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            New experiments are added regularly as I explore cutting-edge
            interaction patterns and push the boundaries of what's possible with
            modern web technologies.
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
