import { db } from "@/db";
import { experience, education, skills, achievements } from "@/db/schema";
import { asc } from "drizzle-orm";

export default async function ResumeDashboard() {
  const allExp = await db.select().from(experience).orderBy(asc(experience.sortOrder));
  const allEdu = await db.select().from(education).orderBy(asc(education.sortOrder));
  const allSkills = await db.select().from(skills).orderBy(asc(skills.category), asc(skills.sortOrder));
  const allAchievements = await db.select().from(achievements).orderBy(asc(achievements.sortOrder));

  return (
    <div className="space-y-10 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Resume Database</h1>
        <p className="text-surface-400">View and manage the core structure of your professional CV.</p>
      </div>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-surface-700/50 pb-2">
          <h2 className="text-xl font-semibold text-white">Experience</h2>
          <span className="text-sm font-medium text-brand-400 cursor-pointer">+ Add Entry</span>
        </div>
        <div className="grid gap-3">
          {allExp.map(exp => (
            <div key={exp.id} className="p-4 rounded-lg bg-surface-800 border border-surface-700/50 flex justify-between">
              <div>
                <p className="font-medium text-white">{exp.title}</p>
                <p className="text-sm text-surface-400">{exp.subtitle} • {exp.period}</p>
              </div>
              <span className="text-brand-400 text-sm cursor-pointer hover:underline">Edit</span>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-surface-700/50 pb-2">
          <h2 className="text-xl font-semibold text-white">Education</h2>
          <span className="text-sm font-medium text-brand-400 cursor-pointer">+ Add Entry</span>
        </div>
        <div className="grid gap-3">
          {allEdu.map(edu => (
            <div key={edu.id} className="p-4 rounded-lg bg-surface-800 border border-surface-700/50 flex justify-between">
              <div>
                <p className="font-medium text-white">{edu.title}</p>
                <p className="text-sm text-surface-400">{edu.subtitle} • {edu.period}</p>
              </div>
              <span className="text-brand-400 text-sm cursor-pointer hover:underline">Edit</span>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-surface-700/50 pb-2">
          <h2 className="text-xl font-semibold text-white">Certifications & Achievements</h2>
          <span className="text-sm font-medium text-brand-400 cursor-pointer">+ Add Entry</span>
        </div>
        <div className="grid gap-3">
          {allAchievements.map(ach => (
            <div key={ach.id} className="p-4 rounded-lg bg-surface-800 border border-surface-700/50 flex justify-between items-center">
              <div>
                <p className="font-medium text-white">{ach.title}</p>
                <p className="text-sm text-surface-400">{ach.description} • {ach.year}</p>
              </div>
              <span className="text-brand-400 text-sm cursor-pointer hover:underline">Edit</span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-surface-700/50 pb-2">
          <h2 className="text-xl font-semibold text-white">Skills Matrix</h2>
          <span className="text-sm font-medium text-brand-400 cursor-pointer">+ Add Skill</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {allSkills.map(s => (
            <span key={s.id} className="px-3 py-1.5 rounded-full bg-surface-800 border border-surface-700/50 text-sm text-surface-200">
              {s.name} <span className="opacity-50 ml-1">({s.category})</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
