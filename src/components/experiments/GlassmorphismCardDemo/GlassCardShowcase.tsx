"use client";
import { motion } from "motion/react";
import GlassCard from "./GlassCard";

export default function GlassCardShowcase() {
  return (
    <div className="w-full space-y-16">
      {/* Interactive vs Static */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Interactive vs Static
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 md:p-12 rounded-2xl bg-linear-to-br from-pink-500 via-rose-500 to-orange-500">
            <GlassCard
              blurIntensity="lg"
              title="Clickable Card"
              description="This card has an onClick handler and is keyboard accessible. Try clicking or using Tab + Enter!"
              index={0}
              onClick={() => alert("Card clicked! 🎉")}
            />
          </div>
          <div className="p-8 md:p-12 rounded-2xl bg-linear-to-br from-green-500 via-emerald-500 to-cyan-500">
            <GlassCard
              blurIntensity="lg"
              title="Static Card"
              description="This card is not clickable (no onClick handler). Perfect for displaying content."
              index={1}
            />
          </div>
        </div>
      </motion.section>

      {/* Different Backgrounds */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          On Different Backgrounds
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-linear-to-br from-purple-500 via-blue-500 to-teal-500">
            <GlassCard
              blurIntensity="lg"
              title="Purple Gradient"
              description="Glassmorphism on purple gradient background"
              index={0}
            />
          </div>
          <div className="p-8 rounded-2xl bg-linear-to-br from-pink-500 via-rose-500 to-orange-500">
            <GlassCard
              blurIntensity="lg"
              title="Pink Gradient"
              description="Glassmorphism on pink gradient background"
              index={1}
            />
          </div>
          <div className="p-8 rounded-2xl bg-linear-to-br from-green-500 via-emerald-500 to-cyan-500">
            <GlassCard
              blurIntensity="lg"
              title="Teal Gradient"
              description="Glassmorphism on teal gradient background"
              index={2}
            />
          </div>
        </div>
      </motion.section>

      {/* Image Background */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          On Image Background
        </h2>
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
            aria-hidden="true"
          />
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          {/* Content */}
          <div className="relative p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GlassCard
                blurIntensity="sm"
                title="Subtle on Image"
                description="Light blur works great on detailed backgrounds"
                index={0}
              />
              <GlassCard
                blurIntensity="md"
                title="Balanced Effect"
                description="Medium blur provides good readability"
                index={1}
              />
              <GlassCard
                blurIntensity="lg"
                title="Strong Glass"
                description="Heavy blur creates dramatic frosted effect"
                index={2}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Content Variations */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Content Variations
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[300px]">
            <GlassCard
              blurIntensity="lg"
              title="Card with Very Long Title That Might Wrap to Multiple Lines"
              description="This is a card with extended content to demonstrate how the component handles longer text. The description can be quite lengthy and should still look good within the glassmorphism card design."
              index={0}
            />
          </div>
          <div className="p-8 rounded-2xl bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 min-h-[200px]">
            <GlassCard
              blurIntensity="lg"
              title="Minimal"
              description="Short text"
              index={1}
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
