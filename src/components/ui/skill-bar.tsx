"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
        />
      </div>
    </div>
  );
}
