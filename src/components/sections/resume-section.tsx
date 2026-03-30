"use client";

import { createElement, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { SkillBar } from "@/components/ui/skill-bar";
import { getIcon } from "@/lib/icons";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import type {
  Education,
  Experience,
  Achievement,
  SkillsByCategory,
} from "@/types";

interface ResumeSectionProps {
  education: Education[];
  experience: Experience[];
  achievements: Achievement[];
  skills: SkillsByCategory;
}

const tabs = [
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Certifications" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ResumeSection({
  education,
  experience,
  achievements,
  skills,
}: ResumeSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>("education");

  return (
    <section id="resume" className="w-full py-20 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Professional Journey"
          subtitle="Education, Experience & Technical Expertise"
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-border pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-ring ${
                activeTab === tab.id
                  ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {activeTab === "education" && (
              <div className="grid md:grid-cols-2 gap-6">
                {education.map((item) => (
                  <ResumeCard key={item.id} item={item} />
                ))}
              </div>
            )}
            {activeTab === "experience" && (
              <div className="grid md:grid-cols-2 gap-6">
                {experience.map((item) => (
                  <ResumeCard key={item.id} item={item} />
                ))}
              </div>
            )}
            {activeTab === "skills" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, categorySkills]) => (
                  <div key={category} className="glass rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-5">
                      {category}
                    </h3>
                    <div className="space-y-5">
                      {categorySkills.map((skill, idx) => (
                        <SkillBar
                          key={skill.id}
                          name={skill.name}
                          level={skill.level}
                          delay={idx * 0.1}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "achievements" && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {achievements.map((item) => {
                  return (
                    <motion.div
                      key={item.id}
                      variants={staggerItem}
                      className="glass rounded-xl p-6 flex flex-col"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center mb-3">
                        {createElement(getIcon(item.iconName), {
                          className: "text-xl text-brand-400",
                        })}
                      </div>
                      <span className="text-xs text-brand-400 font-medium mb-1.5">
                        {item.year}
                      </span>
                      <h4 className="text-base font-semibold text-foreground mb-2">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm flex-grow">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Resume Card sub-component ───────────────────────────────────────────────

interface ResumeCardProps {
  item: Education | Experience;
}

function ResumeCard({ item }: ResumeCardProps) {
  const details: string[] = Array.isArray(item.details) ? item.details : [];

  return (
    <div className="glass rounded-xl p-6 hover:border-brand-500/20 transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
          {createElement(getIcon(item.iconName), {
            className: "text-xl text-brand-400",
          })}
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-foreground">
            {item.title}
          </h4>
          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs text-brand-400 font-medium">
              {item.period}
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {item.result}
            </span>
          </div>
        </div>
      </div>
      <ul className="space-y-2 ml-2">
        {details.map((detail, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400/60 mt-1.5 shrink-0" />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
