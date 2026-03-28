"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { getIcon } from "@/lib/icons";
import { hoverLift } from "@/lib/motion";
import type { Feature } from "@/types";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = getIcon(feature.iconName);

  return (
    <motion.div whileHover={hoverLift}>
      <Link
        href={feature.path}
        className="block h-full p-6 rounded-xl glass group hover:border-brand-500/30 hover:shadow-glow transition-all duration-300 focus-ring"
      >
        <div className="flex flex-col h-full min-h-[260px]">
          <div className="space-y-4 flex-1">
            <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center">
              <Icon className="text-2xl text-brand-400" />
            </div>
            <h3 className="text-lg font-semibold text-surface-100 group-hover:text-brand-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-surface-400 text-sm leading-relaxed line-clamp-3">
              {feature.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-brand-400 mt-4 pt-4 border-t border-surface-700/30">
            <span className="text-sm group-hover:text-brand-300 transition-colors">
              Explore Expertise
            </span>
            <HiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
