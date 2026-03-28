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

function parseProject(row: typeof projects.$inferSelect) {
  return {
    ...row,
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags,
    techStack: typeof row.techStack === "string" ? JSON.parse(row.techStack) : row.techStack,
    features: typeof row.features === "string" ? JSON.parse(row.features) : row.features,
  };
}
