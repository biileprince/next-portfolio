import { cache } from "react";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";

export const getTestimonials = cache(async () => {
  return db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
});
