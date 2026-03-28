import { cache } from "react";
import { db } from "@/db";
import { expertiseContent } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getExpertiseBySlug = cache(async (slug: string) => {
  const rows = await db
    .select()
    .from(expertiseContent)
    .where(eq(expertiseContent.slug, slug))
    .limit(1);

  if (!rows[0]) return null;

  const row = rows[0];
  return {
    ...row,
    items: typeof row.items === "string" ? JSON.parse(row.items) : row.items,
  };
});
