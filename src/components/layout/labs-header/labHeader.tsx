"use client";
import {
  Beaker,
  Code2,
  Github,
  Layers,
  Linkedin,
  Sparkles,
  Twitter,
  User,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/container/container";
import { cn } from "@/lib/utils";

const LabHeader = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    { name: "Home", path: "/labs", icon: Sparkles },
    { name: "Projects", path: "/labs/projects", icon: Code2 },
    { name: "Experiments", path: "/labs/experiments", icon: Beaker },
    { name: "Components", path: "/labs/component-library", icon: Layers },
    { name: "About", path: "/about", icon: User },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: Github,
      label: "Visit our GitHub profile (opens in new tab)",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
      label: "Visit our LinkedIn profile (opens in new tab)",
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
      label: "Visit our Twitter profile (opens in new tab)",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        Skip to main content
      </a>

      <motion.nav
        initial={shouldReduceMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent",
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Haelo Labs - Go to homepage"
              className="focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg focus-visible:ring-2"
            >
              <motion.div
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-teal-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 p-2 rounded-lg">
                    <Sparkles
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-linear-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Haelo Labs
                  </h1>
                  <p className="text-xs text-gray-400">UI Engineering</p>
                </div>
              </motion.div>
            </Link>

            {/* Nav Items */}
            <ul className="hidden md:flex items-center gap-1 list-none">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.name} role="none">
                    <Link
                      href={item.path}
                      aria-current={isActive ? "page" : undefined}
                      className="focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg focus-visible:ring-2"
                    >
                      <motion.div
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, y: -20 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={
                          shouldReduceMotion ? {} : { delay: index * 0.1 }
                        }
                        className={cn(
                          "relative px-4 py-2 rounded-lg transition-all duration-300",
                          isActive
                            ? "text-white"
                            : "text-gray-400 hover:text-white",
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId={shouldReduceMotion ? undefined : "navBg"}
                            className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
                            transition={
                              shouldReduceMotion
                                ? {}
                                : {
                                    type: "spring",
                                    bounce: 0.2,
                                    duration: 0.6,
                                  }
                            }
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex items-center gap-2">
                          <item.icon className="w-4 h-4" aria-hidden="true" />
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                          {isActive && (
                            <span className="sr-only">(current page)</span>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Social Links */}
            <ul
              className="hidden md:flex items-center gap-3 list-none"
              aria-label="Social media links"
            >
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <li key={social.name} role="none">
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={
                        shouldReduceMotion ? {} : { scale: 1.1, y: -2 }
                      }
                      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-950 focus-visible:ring-2"
                    >
                      <IconComponent className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </motion.nav>
    </>
  );
};

export default LabHeader;
