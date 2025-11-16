"use client";
import { Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button/button";
import resumeData from "@/lib/data/resume.json";
import { DecorativeBlobs } from "./DecorativeBlobs";

const ResumeCTA = () => {
  const { cta } = resumeData;

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <DecorativeBlobs />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-black/80 mb-6">
          {cta.title}
        </h2>
        <p className="text-xl text-black/90 mb-12 leading-relaxed">
          {cta.description}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-black/70 hover:bg-gray-50 px-10 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            href={cta.email.href}
          >
            <Mail className="mr-2 w-5 h-5" />
            {cta.email.text}
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-black/20 text-black/70 hover:bg-resume-pink-2 hover:text-black hover:border-transparent px-10 py-6 text-base rounded-xl transition-all duration-300"
            href={cta.social.linkedin.href}
          >
            <Linkedin className="mr-2 w-5 h-5" />
            LinkedIn
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeCTA;
