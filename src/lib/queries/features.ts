import { cache } from "react";
import { db } from "@/db";
import { features } from "@/db/schema";
import { asc } from "drizzle-orm";

export const getFeatures = cache(async () => {
  return db.select().from(features).orderBy(asc(features.sortOrder));
});
