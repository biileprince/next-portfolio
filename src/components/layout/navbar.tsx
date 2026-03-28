"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaCode, FaHome, FaEnvelope, FaTools, FaFileAlt } from "react-icons/fa";
import { sidebarAnimation } from "@/lib/motion";
import type { NavItem } from "@/types";
import { ThemeToggle } from "@/components/theme-toggle";

const navigationItems: NavItem[] = [
  { title: "Home", path: "/", iconName: "FaHome" },
  { title: "Projects", path: "/projects", iconName: "FaCode" },
  { title: "Resume", path: "/resume", iconName: "FaFileAlt" },
  { title: "Skills", path: "/skills", iconName: "FaTools" },
  { title: "Contact", path: "/contact", iconName: "FaEnvelope" },
];

const navIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FaHome, FaCode, FaFileAlt, FaTools, FaEnvelope,
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="sticky top-0 z-50 bg-surface-800/90 backdrop-blur-xl border-b border-surface-700/50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white focus-ring rounded-lg px-1"
            >
              <FaCode className="text-brand-400" />
              <span>Prince Biile</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = navIcons[item.iconName];
                const isActive = pathname === item.path ||
                  (item.path !== "/" && pathname.startsWith(item.path));

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-ring ${
                      isActive
                        ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                        : "text-surface-300 hover:text-white hover:bg-surface-700/50"
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-surface-300 hover:text-white transition-colors focus-ring rounded-lg"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                variants={sidebarAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="md:hidden fixed top-0 left-0 h-full w-72 bg-surface-800/98 backdrop-blur-xl border-r border-surface-700/50 shadow-xl z-[70] overflow-y-auto"
              >
                <div className="p-5 border-b border-surface-700/50">
                  <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white" onClick={closeMenu}>
                      <FaCode className="text-brand-400" />
                      Prince Biile
                    </Link>
                    <button
                      onClick={closeMenu}
                      className="p-2 text-surface-300 hover:text-white focus-ring rounded-lg"
                      aria-label="Close menu"
                    >
                      <HiX size={22} />
                    </button>
                  </div>
                </div>
                <nav className="p-4 space-y-1.5">
                  {navigationItems.map((item) => {
                    const Icon = navIcons[item.iconName];
                    const isActive = pathname === item.path ||
                      (item.path !== "/" && pathname.startsWith(item.path));

                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 focus-ring ${
                          isActive
                            ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                            : "text-surface-300 hover:bg-surface-700/50 hover:text-white"
                        }`}
                      >
                        {Icon && <Icon size={18} />}
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    );
                  })}
                </nav>
              </motion.div>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                onClick={closeMenu}
              />
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 w-full bg-surface-800/95 backdrop-blur-xl border-t border-surface-700/50 z-50"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = navIcons[item.iconName];
            const isActive = pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-0.5 p-2 text-[10px] font-medium transition-colors focus-ring rounded-lg ${
                  isActive ? "text-brand-400" : "text-surface-400 hover:text-white"
                }`}
              >
                {Icon && <Icon size={18} />}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
