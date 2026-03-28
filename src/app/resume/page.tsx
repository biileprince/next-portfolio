import type { Metadata } from "next";
import { getEducation, getExperience, getAchievements } from "@/lib/queries/resume";
import { getSkillsByCategory } from "@/lib/queries/skills";
import { ResumeSection } from "@/components/sections/resume-section";

export const metadata: Metadata = {
  title: "Resume",
  description: "Education, experience, skills, and certifications of Prince Yennuyar Biile.",
};

export default async function ResumePage() {
  const [education, experience, achievements, skills] = await Promise.all([
    getEducation(),
    getExperience(),
    getAchievements(),
    getSkillsByCategory(),
  ]);

  return (
    <ResumeSection
      education={education}
      experience={experience}
      achievements={achievements}
      skills={skills}
    />
  );
}
