"use client";
import { Award, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import servicesData from "@/lib/data/services.json";

// Icon mapping function
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Users,
  Award,
  Zap,
};

export default function ProcessMetrics() {
  const { metrics } = servicesData;

  return (
    <section className="py-32 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-periwinkle-900 mb-6">
            {metrics.header.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {metrics.header.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.items.map((metric, index) => {
            const Icon = iconMap[metric.icon] || TrendingUp;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-periwinkle/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-periwinkle" />
                </div>
                <div className="text-5xl font-bold text-periwinkle-900 mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-periwinkle-900 mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-500">
                  {metric.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
