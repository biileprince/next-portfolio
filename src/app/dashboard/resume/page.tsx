import { db } from "@/db";
import { achievements, education, experience, profile, skills } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ResumeClient } from "./resume-client";

export default async function ResumeDashboard() {
  const profileRow = await db.select().from(profile).limit(1);
  const currentProfile = profileRow[0] ?? null;
  const allExp = await db.select().from(experience).orderBy(asc(experience.sortOrder));
  const allEdu = await db.select().from(education).orderBy(asc(education.sortOrder));
  const allSkills = await db
    .select()
    .from(skills)
    .orderBy(asc(skills.category), asc(skills.sortOrder));
  const allAchievements = await db
    .select()
    .from(achievements)
    .orderBy(asc(achievements.sortOrder));

  const parsedExp = allExp.map((row) => ({
    ...row,
    details: typeof row.details === "string" ? JSON.parse(row.details) : row.details,
  }));
  const parsedEdu = allEdu.map((row) => ({
    ...row,
    details: typeof row.details === "string" ? JSON.parse(row.details) : row.details,
  }));

  return (
    <ResumeClient
      profile={currentProfile}
      experience={parsedExp}
      education={parsedEdu}
      achievements={allAchievements}
      skills={allSkills}
    />
  );
}
