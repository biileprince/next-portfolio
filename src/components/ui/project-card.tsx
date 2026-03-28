"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FaGlobe, FaArrowRight } from "react-icons/fa";
import { hoverLift } from "@/lib/motion";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={hoverLift}
      className="group glass rounded-xl overflow-hidden transition-all duration-300 hover:border-brand-500/30 hover:shadow-glow flex flex-col h-full"
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 to-transparent" />
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-surface-100 group-hover:text-brand-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <div className="flex gap-1.5 shrink-0 ml-2">
            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-surface-700/50 transition-colors focus-ring"
                aria-label={`GitHub repository for ${project.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                <BsGithub className="text-lg text-surface-300 hover:text-white" />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-surface-700/50 transition-colors focus-ring"
                aria-label={`Live demo for ${project.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaGlobe className="text-lg text-surface-300 hover:text-white" />
              </a>
            )}
          </div>
        </div>

        <p className="text-surface-400 text-sm leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {(project.techStack as string[]).slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs rounded-full bg-surface-700/50 text-surface-300 border border-surface-600/30"
            >
              {tech}
            </span>
          ))}
          {(project.techStack as string[]).length > 4 && (
            <span className="px-2.5 py-1 text-xs rounded-full bg-surface-700/50 text-surface-400">
              +{(project.techStack as string[]).length - 4}
            </span>
          )}
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="flex items-center justify-between p-3 -mx-1 rounded-lg hover:bg-surface-700/30 transition-colors group/link focus-ring"
        >
          <span className="text-sm text-brand-400 group-hover/link:text-brand-300">
            View Details
          </span>
          <FaArrowRight className="text-sm text-brand-400 group-hover/link:text-brand-300 transform group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
