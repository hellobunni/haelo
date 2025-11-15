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
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LabHeader = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: Sparkles },
    { name: "Projects", path: "#projects", icon: Code2 },
    { name: "Experiments", path: "/experiments", icon: Beaker },
    { name: "Components", path: "/component-library", icon: Layers },
    { name: "About", path: "/about", icon: User },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-teal-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
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
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.name} href={item.path}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navBg"
                        className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <div className="relative flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default LabHeader;
