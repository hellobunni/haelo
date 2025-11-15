"use client";
import { Code, Palette, Search, Target, TrendingUp } from "lucide-react";
import ProcessStep from "@/components/sections/process/ProcessStep";
import HeroSection from "@/components/sections/shared/HeroSection";
import servicesData from "@/lib/data/services.json";
import FinalCTA from "../sections/home/FinalCTA";

// Icon mapping function
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Palette,
  Code,
  TrendingUp,
  Target,
};

export default function ProcessPage() {
  const { process } = servicesData;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        variant="standard"
        badge={process.header.badge}
        title={{ line1: process.header.title }}
        description={process.header.description}
        scrollIndicator={true}
        scrollAnimation={true}
        maxWidth="max-w-6xl"
        titleSize="text-6xl md:text-7xl lg:text-8xl"
        blobs={[
          {
            position: "top-1/4",
            horizontal: "left-1/4",
            color: "bg-periwinkle-200",
            animated: true,
          },
          {
            position: "top-1/3",
            horizontal: "right-1/4",
            color: "bg-periwinkle-300",
            animated: true,
            delay: 2000,
          },
          {
            position: "bottom-1/4",
            horizontal: "left-1/2",
            color: "bg-gray-200",
            animated: true,
            delay: 4000,
          },
        ]}
      />

      {/* Process Steps */}
      <section className="py-32 bg-linear-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {process.steps.map((step, index) => {
            const StepIcon = iconMap[step.icon] || Target;
            return (
              <ProcessStep
                key={step.number}
                step={{ ...step, icon: StepIcon as typeof Target }}
                index={index}
                isLast={index === process.steps.length - 1}
              />
            );
          })}
        </div>
      </section>

      {/* Final CTA to Contact */}
      <FinalCTA />
    </div>
  );
}
