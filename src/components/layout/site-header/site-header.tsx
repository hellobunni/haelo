"use client";
import clsx from "clsx";
import { ArrowRight, Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileMenu from "@/components/layout/site-header/mobile-menu";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/utils";

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl font-bold text-gray-900 group-hover:text-periwinkle-600 transition-colors duration-300">
              Haelo Studios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.slice(1, 7).map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className={clsx(
                  "text-sm font-medium transition-colors duration-300 relative group",
                  pathname === item.url
                    ? "border-b-2 border-periwinkle-600"
                    : "text-gray-600 hover:text-periwinkle-600",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="sm" variant="periwinkle" rounded href="/contact">
              Let's Talk
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-periwinkle-600 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <MobileMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />
    </motion.nav>
  );
}
