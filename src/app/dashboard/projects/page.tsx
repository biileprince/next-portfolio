import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ProjectsClient } from "./components/projects-client";
import type { Project } from "@/types";

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is string => typeof item === "string",
        );
      }
    } catch {
      return [];
    }
  }
  return [];
}

export default async function ProjectsDashboard() {
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder));
  const normalizedProjects: Project[] = allProjects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    imageUrl: project.imageUrl,
    galleryImages: toStringArray(project.galleryImages),
    tags: toStringArray(project.tags),
    techStack: toStringArray(project.techStack),
    features: toStringArray(project.features),
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    featured: project.featured,
    sortOrder: project.sortOrder,
  }));

  return <ProjectsClient projects={normalizedProjects} />;
}
