import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
  imageUrl: z.string().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  githubUrl: z.string().optional().or(z.literal("")),
  liveUrl: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
