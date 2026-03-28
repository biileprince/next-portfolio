"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { FeatureCard } from "@/components/ui/feature-card";
import { staggerContainer, staggerItem } from "@/lib/motion";
import type { Feature } from "@/types";

interface FeaturesGridProps {
  features: Feature[];
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <section id="features" className="w-full py-20 border-b border-surface-700/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Capabilities" subtitle="Core Expertise" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {features.map((feature) => (
            <motion.div key={feature.id} variants={staggerItem}>
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
