"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { SkillBar } from "@/components/ui/skill-bar";
import { staggerContainer, staggerItem } from "@/lib/motion";
import type { SkillsByCategory } from "@/types";

interface SkillsClientProps {
  skills: SkillsByCategory;
}

export function SkillsClient({ skills }: SkillsClientProps) {
  return (
    <>
      <SectionTitle title="Technical Proficiency" subtitle="Skills & Expertise" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {Object.entries(skills).map(([category, categorySkills]) => (
          <motion.div key={category} variants={staggerItem} className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-surface-100 mb-5">{category}</h3>
            <div className="space-y-5">
              {categorySkills.map((skill, idx) => (
                <SkillBar key={skill.id} name={skill.name} level={skill.level} delay={idx * 0.1} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
