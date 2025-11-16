"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import contentData from "@/lib/data/content.json";
import servicesData from "@/lib/data/services.json";

export default function WhatWeDoMini() {
  const { services } = servicesData;
  const { home } = contentData;

  // Create mini version of services with full details for accordion
  const miniServices = services.items.map((service) => ({
    number: service.number,
    title: service.title,
    description: service.description,
    shortDescription: `${service.description.split(".")[0]}.`, // First sentence only
    features: service.features,
  }));

  return (
    <section className="py-22 bg-white">
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
        {miniServices.map((service, index) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
          >
            <div className="flex items-center gap-2 py-8">
              <span className="text-sm font-medium text-gray-400">
                {service.number}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {service.title}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-md hidden md:block">
                {service.shortDescription}
              </p>
              <Link href="/services" className="shrink-0 cursor-pointer">
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Button type="button" variant="ghost" href={home.whatWeDo.cta.href}>
            {home.whatWeDo.cta.text}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
