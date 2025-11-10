"use client";
import {
  Code2,
  Heart,
  Linkedin,
  Mail,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Craft Over Speed",
      description:
        "We believe in taking the time to do things right. Every pixel, every line of code matters.",
    },
    {
      icon: Target,
      title: "Strategic Thinking",
      description:
        "Beautiful design means nothing without purpose. We align every decision with your business goals.",
    },
    {
      icon: Code2,
      title: "Technical Excellence",
      description:
        "Clean, maintainable code that scales. We build for today and tomorrow.",
    },
    {
      icon: Users,
      title: "Partnership Approach",
      description:
        "Your success is our success. We're not just vendors—we're collaborators in your vision.",
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "5+", label: "Years Experience" },
    { value: "100%", label: "Remote Capable" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-periwinkle-200 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-periwinkle-50 border border-periwinkle-200 mb-8">
              <Sparkles className="w-4 h-4 text-periwinkle-600" />
              <span className="text-sm font-medium text-periwinkle-900">
                About Haelo Studios
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Small Team.
              <br />
              <span className="bg-gradient-to-r from-periwinkle-600 to-periwinkle-400 bg-clip-text text-transparent">
                Big Impact.
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're a boutique digital studio that blends aesthetic
              sophistication with engineering excellence. As a solo-preneur
              operating as a studio, I bring the agility of an independent with
              the professionalism of an agency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Haelo Studios was born from a simple belief: premium brands
                deserve premium digital experiences. Too often, businesses are
                forced to choose between beautiful design and robust
                engineering—or settle for cookie-cutter solutions that don't
                reflect their unique identity.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                As a studio, we bridge that gap. Every project is an opportunity
                to craft something truly exceptional—where form meets function,
                where aesthetics serve strategy, and where attention to detail
                transforms good into extraordinary.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Working with select clients means we can give each project the
                focus it deserves. We're not trying to be everything to
                everyone. Instead, we partner with ambitious brands who value
                quality, understand the power of thoughtful design, and are
                ready to invest in their digital presence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
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
                <div className="absolute inset-0 bg-gradient-to-br from-periwinkle-400 to-periwinkle-600 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                    alt="Founder"
                    width={600}
                    height={800}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-periwinkle-50 border border-periwinkle-200 mb-6">
                <Sparkles className="w-4 h-4 text-periwinkle-600" />
                <span className="text-sm font-medium text-periwinkle-900">
                  Meet the Founder
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your Name
              </h2>
              <p className="text-xl text-periwinkle-600 font-medium mb-6">
                Founder & Lead Designer
              </p>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p>
                  With over 5 years of experience in digital design and
                  engineering, I've had the privilege of working with brands
                  across industries—from startups finding their voice to
                  established companies reimagining their digital presence.
                </p>
                <p>
                  My approach combines strategic thinking with hands-on craft. I
                  believe the best digital experiences come from understanding
                  both the business goals and the user needs, then translating
                  that into elegant, functional design backed by solid
                  engineering.
                </p>
                <p>
                  When I'm not designing or coding, you'll find me exploring the
                  latest design trends, contributing to open-source projects, or
                  working on side projects that push the boundaries of what's
                  possible on the web.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-periwinkle-600 hover:bg-periwinkle-700 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-periwinkle-200"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
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
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-periwinkle-600 to-periwinkle-400 bg-clip-text text-transparent mb-2">
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
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values guide every project, every interaction, every line of
              code.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-periwinkle-200"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-periwinkle-500 to-periwinkle-600 flex items-center justify-center mb-6 shadow-lg shadow-periwinkle-200">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
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

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-periwinkle-900 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-periwinkle-800 rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Create Something
              <br />
              <span className="bg-gradient-to-r from-periwinkle-400 to-periwinkle-300 bg-clip-text text-transparent">
                Remarkable Together
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              If you're a brand that values quality over quantity and believes
              in the power of exceptional design, let's talk.
            </p>
            <Button
              size="lg"
              className="bg-periwinkle-600 hover:bg-periwinkle-500 text-white px-8 py-6 text-lg rounded-xl shadow-xl transition-all duration-300 hover:scale-105"
            >
              Schedule a Discovery Call
            </Button>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .bg-periwinkle-200 {
          background-color: #C7D2FE;
        }
        
        .bg-periwinkle-50 {
          background-color: #F5F7FF;
        }
        
        .border-periwinkle-200 {
          border-color: #C7D2FE;
        }
        
        .text-periwinkle-600 {
          color: #6366F1;
        }
        
        .text-periwinkle-900 {
          color: #312E81;
        }
        
        .from-periwinkle-600 {
          --tw-gradient-from: #6366F1;
        }
        
        .to-periwinkle-400 {
          --tw-gradient-to: #818CF8;
        }
        
        .from-periwinkle-400 {
          --tw-gradient-from: #818CF8;
        }
        
        .to-periwinkle-300 {
          --tw-gradient-to: #A5B4FC;
        }
        
        .from-periwinkle-500 {
          --tw-gradient-from: #6366F1;
        }
        
        .to-periwinkle-600 {
          --tw-gradient-to: #4F46E5;
        }
        
        .shadow-periwinkle-200 {
          --tw-shadow-color: #C7D2FE;
        }
        
        .hover\\:border-periwinkle-200:hover {
          border-color: #C7D2FE;
        }
        
        .bg-periwinkle-600 {
          background-color: #6366F1;
        }
        
        .hover\\:bg-periwinkle-500:hover {
          background-color: #6366F1;
        }
        
        .hover\\:bg-periwinkle-700:hover {
          background-color: #4F46E5;
        }
        
        .bg-periwinkle-900 {
          background-color: #312E81;
        }
        
        .bg-periwinkle-800 {
          background-color: #3730A3;
        }
      `}</style>
    </div>
  );
}
