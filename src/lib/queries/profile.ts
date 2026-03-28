import { cache } from "react";
import { db } from "@/db";
import { profile } from "@/db/schema";

export const getProfile = cache(async () => {
  const rows = await db.select().from(profile).limit(1);
  if (!rows[0]) return null;

  const row = rows[0];
  return {
    ...row,
    socialLinks:
      typeof row.socialLinks === "string"
        ? JSON.parse(row.socialLinks)
        : row.socialLinks,
    typewriterWords:
      typeof row.typewriterWords === "string"
        ? JSON.parse(row.typewriterWords)
        : row.typewriterWords,
  };
});
