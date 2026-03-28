import { cache } from "react";
import { db } from "@/db";
import { education, experience, achievements } from "@/db/schema";
import { asc } from "drizzle-orm";

export const getEducation = cache(async () => {
  const rows = await db.select().from(education).orderBy(asc(education.sortOrder));
  return rows.map((row) => ({
    ...row,
    details: typeof row.details === "string" ? JSON.parse(row.details) : row.details,
  }));
});

export const getExperience = cache(async () => {
  const rows = await db.select().from(experience).orderBy(asc(experience.sortOrder));
  return rows.map((row) => ({
    ...row,
    details: typeof row.details === "string" ? JSON.parse(row.details) : row.details,
  }));
});

export const getAchievements = cache(async () => {
  return db.select().from(achievements).orderBy(asc(achievements.sortOrder));
});
