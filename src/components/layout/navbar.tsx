"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu } from "react-icons/hi";
import { FaCode, FaHome, FaEnvelope, FaTools, FaFileAlt } from "react-icons/fa";
import type { NavItem } from "@/types";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems: NavItem[] = [
  { title: "Home", path: "/", iconName: "FaHome" },
  { title: "Projects", path: "/projects", iconName: "FaCode" },
  { title: "Resume", path: "/resume", iconName: "FaFileAlt" },
  { title: "Skills", path: "/skills", iconName: "FaTools" },
  { title: "Contact", path: "/contact", iconName: "FaEnvelope" },
];

const navIcons: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  FaHome,
  FaCode,
  FaFileAlt,
  FaTools,
  FaEnvelope,
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => setIsMobileMenuOpen(false);

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
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-foreground focus-ring rounded-lg px-1"
            >
              <FaCode className="text-brand-400" />
              <span>Prince Biile</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = navIcons[item.iconName];
                const isActive =
                  pathname === item.path ||
                  (item.path !== "/" && pathname.startsWith(item.path));

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-ring ${
                      isActive
                        ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-lg">
                  <HiMenu size={24} />
                  <span className="sr-only">Toggle navigation menu</span>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-72 bg-background border-border p-0"
                >
                  <SheetHeader className="p-5 border-b border-border text-left">
                    <SheetTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                      <FaCode className="text-brand-400" />
                      Prince Biile
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="p-4 space-y-1.5">
                    {navigationItems.map((item) => {
                      const Icon = navIcons[item.iconName];
                      const isActive =
                        pathname === item.path ||
                        (item.path !== "/" && pathname.startsWith(item.path));

                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={closeMenu}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 focus-ring ${
                            isActive
                              ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {Icon && <Icon size={18} />}
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur-xl border-t border-border z-50"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = navIcons[item.iconName];
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-0.5 p-2 text-[10px] font-medium transition-colors focus-ring rounded-lg ${
                  isActive
                    ? "text-brand-400"
                    : "text-muted-foreground hover:text-foreground"
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
