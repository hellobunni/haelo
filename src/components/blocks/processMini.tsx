"use client";
import { ArrowRight, Code, Palette, Target, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import contentData from "@/lib/data/content.json";
import servicesData from "@/lib/data/services.json";
import { Button } from "../ui/button";

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mx-auto b">
          {miniSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || Target;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col justify-center items-center text-center mx-auto"
              >
                <div className="text-[140px] font-bold text-gray-200 absolute -top-20 left-20 z-0">
                  {step.number}
                </div>
                <div className="z-10 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-periwinkle-500 to-lavender-floral flex items-center justify-center mb-2 shadow-lg shadow-periwinkle-200">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-0">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>

                {/* Connector Line (except last item) */}
                {index < miniSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-linear-to-r from-periwinkle-300 to-transparent"></div>
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
          <Button
            type="button"
            variant="periwinkle"
            className="rounded-md"
            href={processMini.cta.href}
          >
            {processMini.cta.text}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
