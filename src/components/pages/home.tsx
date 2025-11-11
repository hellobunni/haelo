"use client";
import { useRef } from "react";
import HeroSection from "@/components/blocks/HeroSection";
import ProcessMini from "@/components/blocks/processMini";
import CTASection from "@/components/home/CTASection";
import FinalCTA from "@/components/home/FinalCTA";
import SelectedWorks from "@/components/home/SelectedWorks";
import WhatWeDoMini from "@/components/home/WhatWeDoMini";
import contentData from "@/lib/data/content.json";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { home } = contentData;

  return (
    <div ref={containerRef} className="bg-white">
      <HeroSection
        variant="fullscreen"
        badge={home.hero.badge}
        title={home.hero.title}
        description={home.hero.description}
        buttons={home.hero.buttons}
        scrollIndicator={true}
        scrollAnimation={true}
        maxWidth="max-w-6xl"
        titleSize="text-6xl md:text-7xl lg:text-8xl"
        blobs={[
          {
            position: "top-1/4",
            horizontal: "left-1/4",
            color: "bg-thistle",
            animated: true,
          },
          {
            position: "top-1/3",
            horizontal: "right-1/4",
            color: "bg-thistle-2",
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

      {/* Services - Mini Version */}
      <WhatWeDoMini />

      {/* Selected Works */}
      <SelectedWorks />

      {/* CTA Section */}
      <CTASection
        title={home.cta.title}
        description={home.cta.description}
        button={home.cta.button}
      />

      {/* Process - Mini Version */}
      <ProcessMini />

      {/* Final CTA to Contact */}
      <FinalCTA />
    </div>
  );
}
