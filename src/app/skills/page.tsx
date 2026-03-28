import type { Metadata } from "next";
import { getSkillsByCategory } from "@/lib/queries/skills";
import { SkillsClient } from "./skills-client";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills and proficiency levels of Prince Yennuyar Biile across development, cloud, and programming.",
};

export default async function SkillsPage() {
  const skills = await getSkillsByCategory();

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SkillsClient skills={skills} />
      </div>
    </section>
  );
}
