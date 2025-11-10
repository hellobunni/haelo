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

  return (
    <section
      className="pt-12 pb-28 bg-white relative overflow-hidden"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                <div className="bg-linear-to-br from-white to-gray-50 rounded-3xl p-8 md:p-10 shadow-md border border-gray-100 h-full transition-all duration-500 group-hover:shadow-2xl group-hover:border-periwinkle-200">
                  {/* Number Badge */}
                  <div className="absolute top-8 right-8 text-7xl font-bold text-periwinkle-200 group-hover:text-periwinkle-50 transition-colors duration-500">
                    {service.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 relative z-10`}
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
                    <Button
                      size="lg"
                      variant="periwinkle"
                      className="inline-flex items-center gap-2 text-periwinkle-600 font-semibold group-hover:gap-4 transition-all duration-300 rounded-sm w-56"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
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
          <div className="bg-linear-to-r from-periwinkle-50 to-gray-50 rounded-2xl shadow-md px-12 py-20">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {services.cta.title}
            </h3>
            <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
              {services.cta.description}
            </p>
            <Button
              href={services.cta.button.href}
              size="lg"
              variant="periwinkle"
              className="rounded-sm"
            >
              {services.cta.button.text}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
