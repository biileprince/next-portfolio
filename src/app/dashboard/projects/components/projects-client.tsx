"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProjectDialog } from "./project-dialog";
import { DeleteDialog } from "./delete-dialog";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types";

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openCreateDialog = () => {
    setSelectedProject(null);
    setIsProjectDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setSelectedProject(project);
    setIsProjectDialogOpen(true);
  };

  const openDeleteDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-surface-800/50 p-6 rounded-xl border border-surface-700">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Projects
          </h1>
          <p className="text-surface-400 max-w-2xl">
            Create, update, and manage the projects showcased on your portfolio.
            Changes are instantly reflected across your site.
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-brand-500 hover:bg-brand-600 text-white gap-2"
        >
          <Plus size={16} />
          <span>New Project</span>
        </Button>
      </div>

      <div className="rounded-xl border border-surface-700 bg-surface-800/80 overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-surface-900/80 border-b border-surface-700">
            <TableRow className="hover:bg-transparent border-surface-700">
              <TableHead className="w-[80px] font-medium text-surface-300">
                Order
              </TableHead>
              <TableHead className="font-medium text-surface-300">
                Project Name
              </TableHead>
              <TableHead className="font-medium text-surface-300">
                Status
              </TableHead>
              <TableHead className="font-medium text-surface-300">
                Links
              </TableHead>
              <TableHead className="text-right font-medium text-surface-300">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow className="hover:bg-transparent border-surface-700">
                <TableCell
                  colSpan={5}
                  className="text-center text-surface-400 py-10"
                >
                  No projects found. Click &quot;New Project&quot; to add your
                  first one.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((p) => (
                <TableRow
                  key={p.id}
                  className="border-b border-surface-700/50 hover:bg-surface-700/80 transition-colors"
                >
                  <TableCell className="font-mono text-surface-500">
                    {p.sortOrder}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-white">{p.title}</div>
                    <div className="text-xs text-surface-400 line-clamp-1 max-w-sm mt-0.5">
                      {p.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    {p.featured ? (
                      <span className="px-2.5 py-1 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full text-xs font-medium inline-block">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-surface-700/50 border border-surface-600/50 text-surface-400 rounded-full text-xs font-medium inline-block">
                        Standard
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {p.githubUrl && p.githubUrl !== "#" ? (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-surface-400 hover:text-white transition-colors"
                          title="View Source"
                        >
                          <FaGithub size={18} />
                        </a>
                      ) : (
                        <span className="text-surface-600">
                          <FaGithub size={18} />
                        </span>
                      )}

                      {p.liveUrl && p.liveUrl !== "#" ? (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-400 hover:text-brand-300 transition-colors"
                          title="View Live Site"
                        >
                          <ExternalLink size={18} />
                        </a>
                      ) : (
                        <span className="text-surface-600">
                          <ExternalLink size={18} />
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(p)}
                        className="text-surface-400 hover:text-white hover:bg-surface-700 h-8 w-8"
                        title="Edit project"
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(p)}
                        className="text-surface-400 hover:text-error hover:bg-error/10 h-8 w-8"
                        title="Delete project"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProjectDialog
        key={selectedProject?.id ?? "new"}
        open={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
        project={selectedProject}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        project={selectedProject}
      />
    </div>
  );
}
