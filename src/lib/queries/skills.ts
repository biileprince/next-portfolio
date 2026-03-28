import { cache } from "react";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { asc } from "drizzle-orm";
import type { SkillsByCategory } from "@/types";

export const getSkillsByCategory = cache(async (): Promise<SkillsByCategory> => {
  const rows = await db.select().from(skills).orderBy(asc(skills.sortOrder));
  const grouped: SkillsByCategory = {};
  for (const row of rows) {
    if (!grouped[row.category]) grouped[row.category] = [];
    grouped[row.category].push(row);
  }
  return grouped;
});
