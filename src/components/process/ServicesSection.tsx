"use client";
import {
  ArrowRight,
  Code2,
  LineChart,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import servicesData from "@/lib/data/services.json";

// Icon mapping function
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Code2,
  Users,
  LineChart,
  Sparkles,
  ArrowRight,
};

export default function ServicesSection() {
  const { services } = servicesData;
  const BadgeIcon = iconMap[services.header.badge.icon] || Sparkles;

  return (
    <section
      className="pt-12 pb-28 bg-white relative overflow-hidden"
      id="services"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-periwinkle-100 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
              {services.header.badge.text}
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {services.header.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {services.header.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Palette;

            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="bg-linear-to-br from-white to-gray-50 rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 h-full transition-all duration-500 group-hover:shadow-2xl group-hover:border-periwinkle-200">
                  {/* Number Badge */}
                  <div className="absolute top-8 right-8 text-7xl font-bold text-gray-100 group-hover:text-periwinkle-50 transition-colors duration-500">
                    {service.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 relative z-10`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + i * 0.05,
                          }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-periwinkle-500 group-hover:bg-periwinkle-600 transition-colors duration-300" />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Learn More Link */}
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-periwinkle-600 font-semibold group-hover:gap-4 transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-linear-to-r from-periwinkle-50 to-gray-50 rounded-2xl p-12 border border-periwinkle-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {services.cta.title}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {services.cta.description}
            </p>
            <Link href={services.cta.button.href}>
              <Button
                size="lg"
                className="bg-periwinkle-600 hover:bg-periwinkle-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                {services.cta.button.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
