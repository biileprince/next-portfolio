"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createProjectSchema, updateProjectSchema } from "@/lib/validations/project";

export async function deleteProject(id: number) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
    return { success: true, message: "Project deleted successfully" };
  } catch (err) {
    console.error("Failed to delete project:", err);
    return { success: false, message: "Failed to delete project from database" };
  }
}

export type ProjectActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// Helper to reliably split comma-separated strings to array of strings
function parseStringToArray(val: string): string[] {
  if (!val) return [];
  return val.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function saveProject(
  state: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  try {
    const isEdit = formData.has("id");
    
    // Construct the payload by extracting form values
    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      tags: parseStringToArray(formData.get("tags") as string),
      techStack: parseStringToArray(formData.get("techStack") as string),
      features: parseStringToArray(formData.get("features") as string),
      githubUrl: formData.get("githubUrl") as string,
      liveUrl: formData.get("liveUrl") as string,
      featured: formData.get("featured") === "on", // Standard checkbox behaviour
      sortOrder: parseInt((formData.get("sortOrder") as string) || "0", 10),
    };

    if (isEdit) {
      const id = parseInt(formData.get("id") as string, 10);
      const parsed = updateProjectSchema.safeParse(payload);

      if (!parsed.success) {
        return {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        };
      }

      await db.update(projects).set(parsed.data).where(eq(projects.id, id));
      revalidatePath("/projects");
      revalidatePath("/dashboard/projects");
      
      return { success: true, message: "Project updated successfully" };
    } else {
      const parsed = createProjectSchema.safeParse(payload);

      if (!parsed.success) {
        return {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        };
      }

      await db.insert(projects).values(parsed.data);
      revalidatePath("/projects");
      revalidatePath("/dashboard/projects");
      
      return { success: true, message: "Project created successfully" };
    }
  } catch (error) {
    console.error("Failed to save project:", error);
    return { success: false, message: "Internal server error while saving project" };
  }
}
