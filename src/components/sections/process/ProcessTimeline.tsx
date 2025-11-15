"use client";
import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Separator } from "@/components/ui/separator/separator";

interface ProcessTimelineProps {
  steps: Array<{
    number: string;
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon | React.ComponentType<{ className?: string }>;
    color: string;
    details: string[];
    duration: string;
    deliverables: string[];
  }>;
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative py-12">
      {/* Vertical Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2 hidden lg:block">
        <motion.div
          style={{ height: lineHeight }}
          className="w-full bg-linear-to-b from-periwinkle-500 to-periwinkle-500 origin-top"
        />
      </div>

      {/* Timeline Steps */}
      <div className="space-y-32">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={`lg:grid lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}
              >
                {/* Content Side */}
                <div
                  className={`${isEven ? "lg:text-right lg:pr-16" : "lg:col-start-2 lg:pl-16"}`}
                >
                  <span className="text-6xl md:text-7xl font-bold text-gray-100 block mb-2">
                    {step.number}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-periwinkle-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-periwinkle-500 font-medium mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Icon Circle - Center */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 rounded-full bg-linear-to-br from-periwinkle-500 to-periwinkle-500 shadow-xl shadow-periwinkle-300 flex items-center justify-center"
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                {/* Visual Side */}
                <div
                  className={`mt-8 lg:mt-0 ${isEven ? "lg:pl-16" : "lg:col-start-1 lg:pr-16"}`}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-6 lg:hidden">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-periwinkle-500 to-periwinkle-500 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        Phase {step.number}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          Key Activities
                        </h4>
                        <ul className="space-y-2">
                          {step.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-periwinkle-500 mt-2 shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator className="mb-6" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Duration
                          </p>
                          <p className="text-sm font-medium text-periwinkle-900">
                            {step.duration}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Deliverables
                          </p>
                          <p className="text-sm font-medium text-periwinkle-900">
                            {step.deliverables.length} items
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
