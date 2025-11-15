"use client";
import { ExternalLink, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button/button";
import resumeData from "@/lib/data/resume.json";

const ResumeCTA = () => {
  const { cta } = resumeData;

  return (
    <section className="py-32 px-6 bg-linear-to-br from-light-red to-sandy-brown relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {cta.title}
        </h2>
        <p className="text-xl text-white/90 mb-12 leading-relaxed">
          {cta.description}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-light-red hover:bg-gray-50 px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            href={cta.email.href}
          >
            <Mail className="mr-2 w-5 h-5" />
            {cta.email.text}
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg rounded-xl transition-all duration-300"
            href={cta.phone.href}
          >
            {cta.phone.text}
          </Button>
        </div>

        <div className="flex gap-6 justify-center mt-12">
          <a
            href={cta.social.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={cta.social.website.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors duration-300"
          >
            <ExternalLink className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeCTA;
