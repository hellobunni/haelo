"use client";
import {
  Code2,
  Heart,
  Linkedin,
  type LucideIcon,
  Mail,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import HeroSection from "@/components/blocks/HeroSection";
import aboutData from "@/lib/data/about.json";
import FinalCTA from "../home/FinalCTA";

// Icon mapping helper
const iconMap: Record<string, LucideIcon> = {
  Heart,
  Target,
  Code2,
  Users,
  Sparkles,
  Mail,
  Linkedin,
};

export default function About() {
  const { hero, story, founder, stats, values } = aboutData;

  // Extract icon components
  const FounderBadgeIcon = founder.badge.icon
    ? iconMap[founder.badge.icon]
    : null;
  const EmailIcon = founder.social.email.icon
    ? iconMap[founder.social.email.icon]
    : null;
  const LinkedInIcon = founder.social.linkedin.icon
    ? iconMap[founder.social.linkedin.icon]
    : null;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroSection
        variant="standard"
        badge={hero.badge}
        title={{ line1: hero.title.line1, line2: hero.title.line2 }}
        description={hero.description}
        badgeVariant="blank"
        maxWidth="max-w-5xl"
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

      {/* Story Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              {story.title}
            </h2>
            <div className="prose prose-lg max-w-none">
              {story.paragraphs.map((paragraph, index) => (
                <p
                  key={`story-para-${index}-${paragraph.slice(0, 20)}`}
                  className={`text-gray-600 leading-relaxed ${
                    index < story.paragraphs.length - 1 ? "mb-6" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Headshot */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-periwinkle-400 to-periwinkle-50 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={founder.image.src}
                    alt={founder.image.alt}
                    width={600}
                    height={800}
                    className="w-full aspect-3/4 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-periwinkle-50 border border-periwinkle-200 mb-6">
                {FounderBadgeIcon && (
                  <FounderBadgeIcon className="w-4 h-4 text-periwinkle-600" />
                )}
                <span className="text-sm font-medium text-dark-purple">
                  {founder.badge.text}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {founder.name}
              </h2>
              <p className="text-xl text-periwinkle-600 font-medium mb-6">
                {founder.title}
              </p>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                {founder.bio.map((paragraph, index) => (
                  <p key={`founder-bio-${index}-${paragraph.slice(0, 20)}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href={founder.social.email.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-periwinkle-600 hover:bg-periwinkle-700 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-periwinkle-200"
                >
                  {EmailIcon && <EmailIcon className="w-4 h-4" />}
                  {founder.social.email.text}
                </a>
                <a
                  href={founder.social.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium transition-all duration-300"
                >
                  {LinkedInIcon && <LinkedInIcon className="w-4 h-4" />}
                  {founder.social.linkedin.text}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold bg-linear-to-r from-periwinkle-600 to-periwinkle-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {values.header.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {values.header.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.items.map((value, index) => {
              const Icon = value.icon && iconMap[value.icon];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-periwinkle-200"
                >
                  {Icon && (
                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-periwinkle-600 to-periwinkle-600 flex items-center justify-center mb-6 shadow-lg shadow-periwinkle-200">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA to Contact */}
      <FinalCTA />
    </div>
  );
}
