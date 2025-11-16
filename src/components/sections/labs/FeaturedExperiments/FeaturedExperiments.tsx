"use client";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Container from "@/components/ui/container/container";
import { getFeaturedExperiments } from "@/lib/data/labs-data";
import ExperimentCard from "../ExperimentCard/ExperimentCard";

const FeaturedExperiments = () => {
  const featuredExperiments = getFeaturedExperiments();
  return (
    <section className="relative py-32 px-6 bg-linear-to-b from-transparent via-purple-900/5 to-transparent">
      <Container size="xl" paddingX="md" paddingY="none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-teal-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Experiments
            </h2>
          </div>
          <p className="text-gray-400 text-lg mb-8">
            Micro-interactions and motion studies — ready to explore!
          </p>
          <Link href="/labs/experiments">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white"
            >
              <span>View All Experiments</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredExperiments.map((experiment, index) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedExperiments;
