"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { navigationItems } from "@/lib/utils";

export default function DesktopPillNav({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="nav-pill"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "auto", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-periwinkle rounded-full flex items-center overflow-hidden"
    >
      <nav className="flex items-center pl-6 pr-2 py-1 space-x-4">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            className="text-white text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            {item.name}
          </Link>
        ))}
        <button
          onClick={onClose}
          className="p-2 bg-black/10 rounded-full"
          aria-label="Close navigation"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </nav>
    </motion.div>
  );
}
