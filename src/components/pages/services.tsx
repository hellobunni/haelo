"use client";
import HeroSection from "@/components/blocks/HeroSection";
import ServicesSection from "@/components/process/ServicesSection";
import servicesData from "@/lib/data/services.json";

export default function ServicesPage() {
  const { hero } = servicesData;

  return (
    <div className="bg-white">
      <HeroSection
        variant="standard"
        badge={hero.badge}
        title={hero.title}
        description={hero.description}
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

      {/* Services Section */}
      <ServicesSection />
    </div>
  );
}
