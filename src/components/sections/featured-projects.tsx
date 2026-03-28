"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectCard } from "@/components/ui/project-card";
import { staggerContainer, staggerItem } from "@/lib/motion";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="w-full py-20 border-b border-surface-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Explore My Work" subtitle="Featured Projects" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold transition-colors focus-ring rounded-lg px-4 py-2"
          >
            View All Projects
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
