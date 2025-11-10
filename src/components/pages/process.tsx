"use client";
import { Sparkles, Target } from "lucide-react";
import { motion } from "motion/react";
import ProcessCTA from "@/components/process/ProcessCTA";
import ProcessStep from "@/components/process/ProcessStep";
import servicesData from "@/lib/data/services.json";

// Icon mapping function
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Target,
};

export default function ProcessPage() {
  const { process } = servicesData;
  const BadgeIcon = iconMap[process.header.badge.icon] || Sparkles;

  return (
    <div className="bg-white">
      {/* Process Steps */}
      <section className="py-32 bg-linear-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-periwinkle-50 border border-periwinkle-200 mb-6">
              <BadgeIcon className="w-4 h-4 text-periwinkle-600" />
              <span className="text-sm font-medium text-periwinkle-900">
                {process.header.badge.text}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {process.header.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {process.header.description}
            </p>
          </motion.div>

          {process.steps.map((step, index) => {
            const StepIcon = iconMap[step.icon] || Target;
            return (
              <ProcessStep
                key={step.number}
                step={{ ...step, icon: StepIcon as typeof Target }}
                index={index}
                isLast={index === process.steps.length - 1}
              />
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <ProcessCTA />
    </div>
  );
}
