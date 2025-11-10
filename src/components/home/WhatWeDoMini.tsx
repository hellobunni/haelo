"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import contentData from "@/lib/data/content.json";
import servicesData from "@/lib/data/services.json";

export default function WhatWeDoMini() {
  const { services } = servicesData;
  const { home } = contentData;

  // Create mini version of services
  const miniServices = services.items.map((service) => ({
    number: service.number,
    title: service.title,
    description: `${service.description.split(".")[0]}.`, // First sentence only
  }));

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              {home.whatWeDo.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              {home.whatWeDo.description}
            </p>
          </motion.div>
        </div>
        <div className="space-y-0">
          {miniServices.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={home.whatWeDo.cta.href}>
                <div className="grid lg:grid-cols-12 gap-6 py-8 cursor-pointer group">
                  <Separator className="mb-8 group-hover:bg-periwinkle-300 transition-colors col-span-full -mx-6" />
                  <div className="lg:col-span-1 flex items-start">
                    <span className="text-sm font-medium text-gray-400 group-hover:text-periwinkle-600 transition-colors duration-300">
                      {service.number}
                    </span>
                  </div>

                  <div className="lg:col-span-5">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-periwinkle-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-5 flex items-start">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="lg:col-span-1 flex items-start justify-end">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-periwinkle-600 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href={home.whatWeDo.cta.href}>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-periwinkle-600 font-semibold hover:gap-4 transition-all duration-300 text-lg"
            >
              {home.whatWeDo.cta.text}
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
