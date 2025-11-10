"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
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
        <Accordion type="single" collapsible className="w-full">
          {miniServices.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem value={service.number} className="border-none">
                <Separator className="mb-0" />
                <AccordionTrigger className="py-8 hover:no-underline">
                  <div className="grid lg:grid-cols-12 gap-6 w-full text-left">
                    <div className="lg:col-span-1 flex items-start">
                      <span className="text-sm font-medium text-gray-400">
                        {service.number}
                      </span>
                    </div>

                    <div className="lg:col-span-5">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                    </div>

                    <div className="lg:col-span-5 flex items-start">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="lg:col-span-1 flex items-start justify-end">
                      <ArrowRight className="w-5 h-5 text-gray-400 transition-all duration-300" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid lg:grid-cols-12 gap-6 pb-8">
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-11 space-y-4">
                      <p className="text-base text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                      {service.features && service.features.length > 0 && (
                        <div className="space-y-2 pt-4">
                          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {service.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-3 text-sm text-gray-600"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-periwinkle-500 mt-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="pt-4">
                        <Link
                          href={home.whatWeDo.cta.href}
                          className="inline-flex items-center gap-2 text-periwinkle-600 font-semibold hover:gap-4 transition-all duration-300"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
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
