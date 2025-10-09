"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Plus } from "lucide-react";
import DesktopPillNav from "@/components/layout/site-header/desktop-pill-nav";
import MobileMenu from "@/components/layout/site-header/mobile-menu";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/utils";

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavPillOpen, setIsNavPillOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-transparent"
    >
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative flex justify-between items-center h-24">
          {/* Left Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="group">
              <Button
                variant="outline"
                className="rounded-full border-[var(--border)] bg-white/50 backdrop-blur-md"
              >
                <ArrowRight className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-rotate-45" />
                Let's Talk
              </Button>
            </Link>
          </div>

          {/* Centered Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="text-2xl font-bold text-[var(--foreground)]"
            >
              Matte Digital
            </Link>
          </div>

          {/* Right Side: Desktop Pill Nav & Mobile Button */}
          <div className="flex-1 flex justify-end items-center">
            {/* Desktop Pill Navigation */}
            <div className="hidden md:flex items-center justify-end">
              <AnimatePresence mode="wait">
                {isNavPillOpen ? (
                  <DesktopPillNav onClose={() => setIsNavPillOpen(false)} />
                ) : (
                  <motion.button
                    key="nav-plus"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={() => setIsNavPillOpen(true)}
                    className="p-2 border border-[var(--border)] rounded-full bg-white/50 backdrop-blur-md"
                    aria-label="Open navigation"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-[var(--foreground)] p-2 border border-[var(--border)] rounded-full bg-white/50 backdrop-blur-md"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
