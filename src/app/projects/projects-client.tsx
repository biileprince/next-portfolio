"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectCard } from "@/components/ui/project-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";
import { Search, X } from "lucide-react";
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
    [projects],
  );
  const allTech = useMemo(
    () => [...new Set(projects.flatMap((p) => p.techStack as string[]))],
    [projects],
  );

  const filtered = useMemo(() => {
    let result = [...projects];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.techStack as string[]).some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.every((tag) => (p.tags as string[]).includes(tag)),
      );
    }
    if (selectedTech.length > 0) {
      result = result.filter((p) =>
        selectedTech.every((tech) => (p.techStack as string[]).includes(tech)),
      );
    }
    return result;
  }, [projects, searchQuery, selectedTags, selectedTech]);

  const totalPages = Math.ceil(filtered.length / projectsPerPage);
  const currentProjects = filtered.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage,
  );

  const toggleFilter = (value: string, type: "tag" | "tech") => {
    const setter = type === "tag" ? setSelectedTags : setSelectedTech;
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
    setCurrentPage(1);
  };

  const hasFilters =
    searchQuery || selectedTags.length > 0 || selectedTech.length > 0;

  const clearAll = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedTech([]);
    setCurrentPage(1);
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Project Archive" subtitle="Explore All Projects" />

        {/* AxiomCraft Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto mb-12 p-6 glass border-brand-500/30 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <h3 className="text-xl font-extrabold text-foreground mb-2 flex items-center gap-2">
                Looking for more of my recent works? 🚀
              </h3>
              <p className="text-muted-foreground text-base">
                Most of my projects are hosted on my freelance website,{" "}
                <span className="font-bold text-brand-500">AxiomCraft</span>.
                Check it out to
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="https://www.axiomcraft.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-brand-500 text-white rounded-lg font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 text-sm focus-ring"
              >
                Visit AxiomCraft
              </a>
              <a
                href="https://www.axiomcraft.dev/work"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-brand-500 text-brand-600 dark:text-brand-400 rounded-lg font-bold hover:bg-brand-500/10 transition-colors text-sm focus-ring"
              >
                View Works Portfolio
              </a>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Search projects by name or technology..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-12 glass border-border focus:border-brand-400"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Project Types:
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleFilter(tag, "tag")}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 focus-ring ${
                    selectedTags.includes(tag)
                      ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                      : "glass-light text-muted-foreground hover:text-foreground"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Technologies:
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTech.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleFilter(tech, "tech")}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 focus-ring ${
                    selectedTech.includes(tech)
                      ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                      : "glass-light text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-medium">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-medium">
              {projects.length}
            </span>{" "}
            projects
          </p>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-brand-400 hover:text-brand-300 gap-1.5"
            >
              <X size={14} /> Clear filters
            </Button>
          )}
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
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center py-16 text-muted-foreground"
          >
            <p className="text-lg mb-2">No projects found</p>
            <p className="text-sm">
              Try adjusting your filters or search query.
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <nav className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <Button
                    key={num}
                    variant={currentPage === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(num)}
                    className={
                      currentPage === num
                        ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                        : "glass text-muted-foreground hover:text-foreground"
                    }
                  >
                    {num}
                  </Button>
                ),
              )}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
