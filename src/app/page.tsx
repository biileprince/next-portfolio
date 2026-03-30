import { Hero } from "@/components/sections/hero";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ResumeSection } from "@/components/sections/resume-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { getProfile } from "@/lib/queries/profile";
import { getFeatures } from "@/lib/queries/features";
import { getFeaturedProjects } from "@/lib/queries/projects";
import {
  getEducation,
  getExperience,
  getAchievements,
} from "@/lib/queries/resume";
import { getSkillsByCategory } from "@/lib/queries/skills";
import { getTestimonials } from "@/lib/queries/testimonials";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    profileData,
    features,
    projects,
    education,
    experience,
    achievements,
    skills,
    testimonials,
  ] = await Promise.all([
    getProfile(),
    getFeatures(),
    getFeaturedProjects(),
    getEducation(),
    getExperience(),
    getAchievements(),
    getSkillsByCategory(),
    getTestimonials(),
  ]);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-surface-400">
        <p>No profile data found. Please run the database seed.</p>
      </div>
    );
  }

  return (
    <>
      <Hero
        name={profileData.name}
        bio={profileData.bio}
        cvUrl={profileData.cvUrl}
        heroImageUrl={profileData.heroImageUrl}
        socialLinks={profileData.socialLinks}
        typewriterWords={profileData.typewriterWords}
      />
      <FeaturesGrid features={features} />
      <FeaturedProjects projects={projects} />
      <ResumeSection
        education={education}
        experience={experience}
        achievements={achievements}
        skills={skills}
      />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
