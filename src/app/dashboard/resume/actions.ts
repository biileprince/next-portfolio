"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { achievements, education, experience, profile } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export type ResumeActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function toLines(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== "string") return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function toOptionalNumber(value: FormDataEntryValue | null): number | undefined {
  if (!value || typeof value !== "string") return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function requiredField(val: FormDataEntryValue | null, label: string) {
  if (!val || typeof val !== "string" || !val.trim()) {
    return `${label} is required`;
  }
  return null;
}

export async function addExperience(
  _state: ResumeActionState,
  formData: FormData,
): Promise<ResumeActionState> {
  const errors: Record<string, string[]> = {};
  const titleError = requiredField(formData.get("title"), "Title");
  const subtitleError = requiredField(formData.get("subtitle"), "Subtitle");
  const periodError = requiredField(formData.get("period"), "Period");

  if (titleError) errors.title = [titleError];
  if (subtitleError) errors.subtitle = [subtitleError];
  if (periodError) errors.period = [periodError];

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Validation failed", errors };
  }

  const sortOrder =
    toOptionalNumber(formData.get("sortOrder")) ??
    ((await db
      .select()
      .from(experience)
      .orderBy(desc(experience.sortOrder))
      .limit(1))[0]?.sortOrder ?? 0) + 1;

  await db.insert(experience).values({
    title: formData.get("title") as string,
    subtitle: formData.get("subtitle") as string,
    period: formData.get("period") as string,
    details: JSON.stringify(toLines(formData.get("details"))),
    iconName: (formData.get("iconName") as string) || "FaFileAlt",
    result: (formData.get("result") as string) || "",
    sortOrder,
  });

  revalidatePath("/resume");
  revalidatePath("/dashboard/resume");

  return { success: true, message: "Experience entry added" };
}

export async function addEducation(
  _state: ResumeActionState,
  formData: FormData,
): Promise<ResumeActionState> {
  const errors: Record<string, string[]> = {};
  const titleError = requiredField(formData.get("title"), "Title");
  const subtitleError = requiredField(formData.get("subtitle"), "Subtitle");
  const periodError = requiredField(formData.get("period"), "Period");

  if (titleError) errors.title = [titleError];
  if (subtitleError) errors.subtitle = [subtitleError];
  if (periodError) errors.period = [periodError];

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Validation failed", errors };
  }

  const sortOrder =
    toOptionalNumber(formData.get("sortOrder")) ??
    ((await db
      .select()
      .from(education)
      .orderBy(desc(education.sortOrder))
      .limit(1))[0]?.sortOrder ?? 0) + 1;

  await db.insert(education).values({
    title: formData.get("title") as string,
    subtitle: formData.get("subtitle") as string,
    period: formData.get("period") as string,
    details: JSON.stringify(toLines(formData.get("details"))),
    iconName: (formData.get("iconName") as string) || "FaGraduationCap",
    result: (formData.get("result") as string) || "",
    sortOrder,
  });

  revalidatePath("/resume");
  revalidatePath("/dashboard/resume");

  return { success: true, message: "Education entry added" };
}

export async function addAchievement(
  _state: ResumeActionState,
  formData: FormData,
): Promise<ResumeActionState> {
  const errors: Record<string, string[]> = {};
  const titleError = requiredField(formData.get("title"), "Title");
  const yearError = requiredField(formData.get("year"), "Year");
  const descriptionError = requiredField(formData.get("description"), "Description");

  if (titleError) errors.title = [titleError];
  if (yearError) errors.year = [yearError];
  if (descriptionError) errors.description = [descriptionError];

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Validation failed", errors };
  }

  const sortOrder =
    toOptionalNumber(formData.get("sortOrder")) ??
    ((await db
      .select()
      .from(achievements)
      .orderBy(desc(achievements.sortOrder))
      .limit(1))[0]?.sortOrder ?? 0) + 1;

  await db.insert(achievements).values({
    year: formData.get("year") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    iconName: (formData.get("iconName") as string) || "FaAward",
    sortOrder,
  });

  revalidatePath("/resume");
  revalidatePath("/dashboard/resume");

  return { success: true, message: "Certification added" };
}

export async function updateProfileHero(
  _state: ResumeActionState,
  formData: FormData,
): Promise<ResumeActionState> {
  const id = Number(formData.get("profileId"));
  const heroImageUrl = (formData.get("heroImageUrl") as string) || "";

  if (!id || !heroImageUrl.trim()) {
    return {
      success: false,
      message: "Hero image URL is required",
    };
  }

  await db.update(profile).set({ heroImageUrl }).where(eq(profile.id, id));
  revalidatePath("/");
  revalidatePath("/resume");
  revalidatePath("/dashboard/resume");

  return { success: true, message: "Hero image updated" };
}

export async function updateProfileCv(
  _state: ResumeActionState,
  formData: FormData,
): Promise<ResumeActionState> {
  const id = Number(formData.get("profileId"));
  const cvUrl = (formData.get("cvUrl") as string) || "";

  if (!id || !cvUrl.trim()) {
    return {
      success: false,
      message: "CV URL is required",
    };
  }

  await db.update(profile).set({ cvUrl }).where(eq(profile.id, id));
  revalidatePath("/");
  revalidatePath("/resume");
  revalidatePath("/dashboard/resume");

  return { success: true, message: "CV updated" };
}
