"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectCard } from "@/components/ui/project-card";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";
import type { Project } from "@/types";

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const allTags = useMemo(
    () => [...new Set(projects.flatMap((p) => p.tags as string[]))],
    [projects]
  );
  const allTech = useMemo(
    () => [...new Set(projects.flatMap((p) => p.techStack as string[]))],
    [projects]
  );

  const filtered = useMemo(() => {
    let result = [...projects];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.techStack as string[]).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.every((tag) => (p.tags as string[]).includes(tag))
      );
    }
    if (selectedTech.length > 0) {
      result = result.filter((p) =>
        selectedTech.every((tech) => (p.techStack as string[]).includes(tech))
      );
    }
    return result;
  }, [projects, searchQuery, selectedTags, selectedTech]);

  const totalPages = Math.ceil(filtered.length / projectsPerPage);
  const currentProjects = filtered.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const toggleFilter = (value: string, type: "tag" | "tech") => {
    const setter = type === "tag" ? setSelectedTags : setSelectedTech;
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Project Archive" subtitle="Explore All Projects" />

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-5 py-3 glass rounded-xl text-surface-200 placeholder-surface-500 focus:outline-none focus:border-brand-400 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="space-y-6 mb-10">
          <div>
            <h3 className="text-sm font-medium text-surface-400 mb-3">Project Types:</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleFilter(tag, "tag")}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 focus-ring ${
                    selectedTags.includes(tag)
                      ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                      : "glass-light text-surface-400 hover:text-surface-200"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-surface-400 mb-3">Technologies:</h3>
            <div className="flex flex-wrap gap-2">
              {allTech.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleFilter(tech, "tech")}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 focus-ring ${
                    selectedTech.includes(tech)
                      ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                      : "glass-light text-surface-400 hover:text-surface-200"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {currentProjects.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={`${searchQuery}-${selectedTags.join()}-${selectedTech.join()}-${currentPage}`}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {currentProjects.map((project) => (
              <motion.div key={project.id} variants={staggerItem}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center py-16 text-surface-500">
            No projects found matching your criteria
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <nav className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-ring ${
                    currentPage === num
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                      : "glass text-surface-400 hover:text-white"
                  }`}
                >
                  {num}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
