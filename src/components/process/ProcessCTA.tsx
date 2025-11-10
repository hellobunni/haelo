"use client";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import servicesData from "@/lib/data/services.json";

// Icon mapping function
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  MessageCircle,
  ArrowRight,
};

export default function ProcessCTA() {
  const { cta } = servicesData;

  return (
    <section className="py-32 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-periwinkle-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-periwinkle-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-periwinkle-900/30 border border-periwinkle-700/30 mb-8">
            <div className="w-2 h-2 rounded-full bg-periwinkle-400 animate-pulse" />
            <span className="text-sm font-medium text-periwinkle-300">
              {cta.badge.text}
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {cta.title.line1}
            <br />
            <span className="bg-linear-to-r from-periwinkle-400 to-periwinkle-300 bg-clip-text text-transparent">
              {cta.title.line2}
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {cta.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={cta.buttons.primary.href}>
              <Button
                size="lg"
                className="bg-periwinkle-600 hover:bg-periwinkle-500 text-white px-8 py-6 text-lg rounded-xl shadow-xl shadow-periwinkle-900/50 transition-all duration-300 hover:shadow-2xl hover:shadow-periwinkle-800/50 hover:scale-105"
              >
                {(() => {
                  const PrimaryIcon =
                    iconMap[cta.buttons.primary.icon] || Calendar;
                  return <PrimaryIcon className="mr-2 w-5 h-5" />;
                })()}
                {cta.buttons.primary.text}
              </Button>
            </Link>
            <Link href={cta.buttons.secondary.href}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-600 text-gray-100 hover:bg-gray-800 hover:border-gray-500 px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                {(() => {
                  const SecondaryIcon =
                    iconMap[cta.buttons.secondary.icon] || MessageCircle;
                  return <SecondaryIcon className="mr-2 w-5 h-5" />;
                })()}
                {cta.buttons.secondary.text}
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 pt-16 border-t border-gray-700"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {cta.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`}>
                  <p className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
