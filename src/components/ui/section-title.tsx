"use client";

import { motion } from "framer-motion";
import { slideUp, viewportOnce } from "@/lib/motion";
import type { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export function SectionTitle({ title, subtitle, align = "center" }: SectionTitleProps) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`mb-12 ${align === "center" ? "text-center" : ""}`}
    >
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-400 mb-3">
        {title}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {subtitle}
      </h2>
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
