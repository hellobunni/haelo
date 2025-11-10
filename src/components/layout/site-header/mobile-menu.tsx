"use client";
import { X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/utils";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 md:hidden"
    >
      <div className="flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold" onClick={onClose}>
          Matte Digital
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="text-[var(--foreground)] p-2 border border-border rounded-full"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4 mt-8">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            onClick={onClose}
            className="block text-5xl font-bold py-3"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="absolute bottom-8 left-4 right-4">
        <Link href="/contact" onClick={onClose}>
          <Button className="w-full bg-periwinkle text-white font-bold text-lg h-16 rounded-2xl">
            Let's Talk
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
