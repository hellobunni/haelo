"use client";
import { motion } from "motion/react";

const LabsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative pt-20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-linear-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
          Haelo Labs
        </h1>
        <p className="text-gray-400 text-lg">
          UI Engineering & Experimental Projects
        </p>
      </div>
    </motion.div>
  );
};

export default LabsPage;
