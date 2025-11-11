"use client";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface ProcessStepProps {
  step: {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon | React.ComponentType<{ className?: string }>;
    color: string;
    details: string[];
    duration: string;
    deliverables: string[];
  };
  index: number;
  isLast: boolean;
}

export default function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={index === 0 ? { opacity: 1, y: 0 } : undefined}
      whileInView={index > 0 ? { opacity: 1, y: 0 } : undefined}
      viewport={index > 0 ? { once: true, margin: "-100px" } : undefined}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative mb-32"
    >
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left Column - Number & Icon */}
        <div className="md:col-span-3">
          <div className="sticky top-32">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-periwinkle/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-jordy-blue" />
              </div>
              <span className="text-6xl font-bold text-gray-200">
                {step.number}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-500">{step.subtitle}</p>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="md:col-span-9">
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {step.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                What We Do
              </h4>
              <ul className="space-y-3">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-jordy-blue mt-0.5 shrink-0" />
                    <span className="text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                Timeline & Deliverables
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Duration</p>
                  <p className="text-lg font-medium text-gray-900">
                    {step.duration}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Deliverables</p>
                  <ul className="space-y-2">
                    {step.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="text-gray-600 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-jordy-blue"></span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-8 top-32 bottom-0 w-0.5 bg-linear-to-b from-periwinkle/30 to-transparent hidden md:block"></div>
      )}
    </motion.div>
  );
}
