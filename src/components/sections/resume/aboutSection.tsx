"use client";
import { motion } from "motion/react";
import resumeData from "@/lib/data/resume.json";
import { SectionHeader } from "./SectionHeader";

const AboutSection = () => {
  const { about } = resumeData;

  return (
    <section className="py-32 px-6 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label={about.label}
          title={about.title}
          className="mb-8"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={`paragraph-${paragraph.slice(0, 30)}-${index}`}
                className={
                  index === about.paragraphs.length - 1 &&
                  about.lastParagraphClass
                    ? about.lastParagraphClass
                    : ""
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
