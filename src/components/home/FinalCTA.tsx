"use client";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
    <section className="py-32 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-br from-periwinkle-600 to-periwinkle-500 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-periwinkle-800 rounded-full blur-3xl opacity-20"></div>
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
              className="text-xl text-periwinkle-50 mb-10 max-w-2xl mx-auto"
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
              <Link href={home.finalCTA.buttons.primary.href}>
                <Button
                  size="lg"
                  className="bg-white text-periwinkle-600 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <PrimaryIcon className="mr-2 w-5 h-5" />
                  {home.finalCTA.buttons.primary.text}
                </Button>
              </Link>
              <Link href={home.finalCTA.buttons.secondary.href}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl transition-all duration-300"
                >
                  {home.finalCTA.buttons.secondary.text}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 pt-8"
            >
              <Separator className="mb-8 opacity-20" />
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {home.finalCTA.stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`}>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-periwinkle-100">{stat.label}</p>
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
