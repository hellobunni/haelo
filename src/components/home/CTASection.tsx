"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import contentData from "@/lib/data/content.json";

export default function CTASection() {
  const { home } = contentData;

  return (
    <section className="py-32 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-periwinkle-900 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-periwinkle-800 rounded-full blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {home.cta.title.line1}
            <br />
            <span className="bg-linear-to-r from-periwinkle-400 to-periwinkle-300 bg-clip-text text-transparent">
              {home.cta.title.line2}
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {home.cta.description}
          </p>
          <Button
            size="lg"
            variant="periwinkle"
            href={home.cta.button.href}
            className="transition-all duration-300 hover:scale-105 shadow-sm shadow-periwinkle-600 rounded-md w-48"
          >
            {home.cta.button.text}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
