"use client";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button/button";
import contentData from "@/lib/data/content.json";

// Icon mapping function
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  ArrowRight,
};

export default function FinalCTA() {
  const { home } = contentData;
  const PrimaryIcon = iconMap[home.finalCTA.buttons.primary.icon] || Calendar;

  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-periwinkle-500 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-periwinkle-500 rounded-full blur-3xl opacity-10"></div>
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {home.finalCTA.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              {home.finalCTA.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                href={home.finalCTA.buttons.primary.href}
                variant="periwinkle"
                className="px-8 py-6 text-lg rounded-xl shadow-none hover:shadow-none"
              >
                <PrimaryIcon className="mr-2 w-5 h-5" />
                {home.finalCTA.buttons.primary.text}
              </Button>
              <Button
                size="lg"
                variant="outline"
                href={home.finalCTA.buttons.secondary.href}
                className="px-8 py-6 text-lg rounded-xl"
              >
                {home.finalCTA.buttons.secondary.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-gray-700"
            >
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {home.finalCTA.stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`}>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
