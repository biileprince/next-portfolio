"use client";

import { motion, type Variants } from "framer-motion";
import { slideUp, viewportOnce } from "@/lib/motion";
import type { ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export function AnimatedWrapper({
  children,
  variants = slideUp,
  className = "",
  delay = 0,
}: AnimatedWrapperProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
