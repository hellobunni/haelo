"use client";
import { ArrowRight, Code, Palette, Target, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import contentData from "@/lib/data/content.json";
import servicesData from "@/lib/data/services.json";

// Icon mapping function
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Palette,
  Code,
  TrendingUp,
  ArrowRight,
};

export default function ProcessMini() {
  const { process } = servicesData;
  const { processMini } = contentData;

  // Create mini version of steps with just number, icon, title, and description
  const miniSteps = process.steps.map((step) => ({
    number: step.number,
    icon: step.icon,
    title: step.title,
    description: step.subtitle,
  }));

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {processMini.header.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {processMini.header.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {miniSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || Target;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-7xl font-bold text-periwinkle-500 absolute top-4 right-4">
                    {step.number}
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-periwinkle-500 to-periwinkle-600 flex items-center justify-center mb-4 shadow-lg shadow-periwinkle-200 bg-peri">
                      <Icon className="w-7 h-7 text-periwinkle-500" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>

                {/* Connector Line (except last item) */}
                {index < miniSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-periwinkle-300 to-transparent"></div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href={processMini.cta.href}>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-periwinkle-600 font-semibold hover:gap-4 transition-all duration-300"
            >
              {processMini.cta.text}
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
