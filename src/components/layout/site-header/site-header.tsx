"use client";
import { ArrowRight, Menu, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "@/components/layout/site-header/mobile-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { navigationItems } from "@/lib/utils";

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavPillOpen, setIsNavPillOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Change background after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 shadow-sm ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative flex justify-between items-center h-24">
          {/* Left Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="group">
              <Button
                variant="outline"
                className="rounded-full border-border bg-white/50 backdrop-blur-md cursor-pointer hover:bg-periwinkle transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-rotate-45" />
                Let's Talk
              </Button>
            </Link>
          </div>

          {/* Centered Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-2xl font-bold text-foreground">
              Haelo Studio
            </Link>
          </div>

          {/* Right Side: Desktop Pill Nav & Mobile Button */}
          <div className="flex-1 flex justify-end items-center">
            {/* Desktop Pill Navigation */}
            <div className="hidden md:flex items-center justify-end">
              <Popover open={isNavPillOpen} onOpenChange={setIsNavPillOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="p-2 border border-border rounded-full bg-white/50 backdrop-blur-md cursor-pointer hover:bg-white/70 transition-colors"
                    aria-label="Open navigation"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={8}
                  className="bg-periwinkle rounded-full border-0 p-0 w-auto shadow-lg"
                >
                  <nav className="flex items-center pl-6 pr-2 py-1 space-x-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.url}
                        onClick={() => setIsNavPillOpen(false)}
                        className="text-white text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap cursor-pointer"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={() => setIsNavPillOpen(false)}
                      className="p-2 bg-black/10 rounded-full cursor-pointer hover:bg-black/20 transition-colors"
                      aria-label="Close navigation"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </nav>
                </PopoverContent>
              </Popover>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-foreground p-2 border border-border rounded-full bg-white/50 backdrop-blur-md"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <MobileMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />
    </motion.nav>
  );
}
