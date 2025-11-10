"use client";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import ServicesSection from "@/components/process/ServicesSection";
import { Button } from "@/components/ui/button";
import servicesData from "@/lib/data/services.json";

// Icon mapping function
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  ChevronDown,
  ArrowRight,
};

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const { hero } = servicesData;
  const BadgeIcon = iconMap[hero.badge.icon] || Sparkles;

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-linear-to-b from-gray-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-periwinkle-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-periwinkle-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-periwinkle-50 border border-periwinkle-200 mb-8">
              <BadgeIcon className="w-4 h-4 text-periwinkle-600" />
              <span className="text-sm font-medium text-periwinkle-900">
                {hero.badge.text}
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {hero.title.line1}
            <br />
            <span className="bg-periwinkle-600 bg-clip-text text-transparent">
              {hero.title.line2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href={hero.buttons.primary.href}>
              <Button
                size="lg"
                className="bg-periwinkle-600 hover:bg-periwinkle-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-periwinkle-200 transition-all duration-300 hover:shadow-xl hover:shadow-periwinkle-300"
              >
                {hero.buttons.primary.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href={hero.buttons.secondary.href}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                {hero.buttons.secondary.text}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <ServicesSection />
    </div>
  );
}
