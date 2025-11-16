"use client";
import { ArrowRight, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import resumeData from "@/lib/data/resume.json";
import { fadeInUp, stagger } from "@/lib/helpers/motion-variants";
import { DecorativeBlobs } from "./DecorativeBlobs";

const ResumeHeader = () => {
  const { header } = resumeData;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <DecorativeBlobs
        blobs={[
          {
            position: "top-20",
            horizontal: "right-10",
            size: "w-72 h-72",
            color: "bg-resume-pink-2/30",
          },
          {
            position: "bottom-20",
            horizontal: "left-10",
            size: "w-96 h-96",
            color: "bg-tropical-indigo-2/30",
          },
        ]}
      />

      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={stagger}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <Badge className="bg-resume-pink-1/10 text-slate-600 border-resume-purple-1/30 px-4 py-1.5 text-sm font-medium">
            {header.badge}
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-linear-to-r from-tropical-indigo-2 via-tropical-indigo
						to-tropical-indigo-2/80 bg-clip-text text-transparent"
        >
          {header.name}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xl md:text-3xl text-gray-700 mb-4 font-light"
        >
          {header.title}
        </motion.p>

        <motion.p
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {header.description}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-tropical-indigo-2 hover:bg-tropical-indigo/90 text-white px-10 py-4 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            href={header.buttons.primary.href}
          >
            {header.buttons.primary.text}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-gray-300 hover:border-resume-purple-1 px-10 py-4 text-base rounded-lg transition-all duration-300"
            href={header.buttons.secondary.href}
          >
            <Linkedin className="mr-2 w-5 h-5" />
            {header.buttons.secondary.text}
          </Button>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 flex items-center justify-center gap-2 text-gray-500"
        >
          <div className="w-12 h-px bg-gray-300" />
          <span className="text-sm">{header.location}</span>
          <div className="w-12 h-px bg-gray-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ResumeHeader;
