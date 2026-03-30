import { cache } from "react";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export const getAllProjects = cache(async () => {
  const rows = await db.select().from(projects).orderBy(asc(projects.sortOrder));
  return rows.map(parseProject);
});

export const getFeaturedProjects = cache(async () => {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.featured, true))
    .orderBy(asc(projects.sortOrder));
  return rows.map(parseProject);
});

export const getProjectById = cache(async (id: number) => {
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  if (!rows[0]) return null;
  return parseProject(rows[0]);
});

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      return [];
    }
  }

  return [];
}

function parseProject(row: typeof projects.$inferSelect) {
  return {
    ...row,
    tags: toStringArray(row.tags),
    techStack: toStringArray(row.techStack),
    features: toStringArray(row.features),
    galleryImages: toStringArray(row.galleryImages),
  };
}
