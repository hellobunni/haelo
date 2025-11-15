"use client";

import { Coffee } from "lucide-react";
import AboutSection from "../sections/resume/aboutSection";
import { DecorativeBlobs } from "../sections/resume/DecorativeBlobs";
import Experience from "../sections/resume/experience";
import ResumeHeader from "../sections/resume/portfolioHeader";
import ResumeCTA from "../sections/resume/resumeCTA";
import SkillsSection from "../sections/resume/skillsSection";
import WorkSection from "../sections/resume/works";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-resume-pink-1/20">
      {/* Hero Section */}
      <ResumeHeader />
      <AboutSection />

      <SkillsSection />

      <WorkSection />
      <Experience />

      <ResumeCTA />

      {/* Footer */}
      <footer className="relative py-8 px-6 bg-gray-900 text-center overflow-hidden">
        <DecorativeBlobs
          blobs={[
            {
              position: "top-0",
              horizontal: "right-10",
              size: "w-72 h-72",
              color: "bg-resume-purple-2/10",
            },
            {
              position: "bottom-0",
              horizontal: "left-10",
              size: "w-96 h-96",
              color: "bg-resume-pink-3/10",
            },
          ]}
        />

        <p className="relative z-10 text-gray-400 text-sm flex items-center justify-center gap-1">
          © 2025 Bryanna Gardner. Designed & Built with React + lots of{" "}
          <Coffee className="w-4 h-4 text-resume-purple-1 inline-block" />
        </p>
      </footer>
    </div>
  );
}
