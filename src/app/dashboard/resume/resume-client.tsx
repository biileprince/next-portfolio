"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type {
  Achievement,
  Education,
  Experience,
  Profile,
  Skill,
} from "@/types";
import { ImageUpload } from "@/app/dashboard/projects/components/image-upload";
import { DocumentUpload } from "./document-upload";
import {
  addAchievement,
  addEducation,
  addExperience,
  updateProfileCv,
  updateProfileHero,
  type ResumeActionState,
} from "./actions";

interface ResumeClientProps {
  profile: Profile | null;
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
  skills: Skill[];
}

const initialState: ResumeActionState = {
  success: false,
  message: "",
};

export function ResumeClient({
  profile,
  experience,
  education,
  achievements,
  skills,
}: ResumeClientProps) {
  const [heroUrl, setHeroUrl] = useState(profile?.heroImageUrl ?? "");
  const [cvUrl, setCvUrl] = useState(profile?.cvUrl ?? "");
  const [expOpen, setExpOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [achOpen, setAchOpen] = useState(false);

  const [expState, expAction, expPending] = useActionState(
    addExperience,
    initialState,
  );
  const [eduState, eduAction, eduPending] = useActionState(
    addEducation,
    initialState,
  );
  const [achState, achAction, achPending] = useActionState(
    addAchievement,
    initialState,
  );
  const [heroState, heroAction, heroPending] = useActionState(
    updateProfileHero,
    initialState,
  );
  const [cvState, cvAction, cvPending] = useActionState(
    updateProfileCv,
    initialState,
  );

  useEffect(() => {
    if (!expState.message) return;
    if (expState.success) {
      toast.success(expState.message);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpOpen(false);
    } else {
      toast.error(expState.message);
    }
  }, [expState]);

  useEffect(() => {
    if (!eduState.message) return;
    if (eduState.success) {
      toast.success(eduState.message);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEduOpen(false);
    } else {
      toast.error(eduState.message);
    }
  }, [eduState]);

  useEffect(() => {
    if (!achState.message) return;
    if (achState.success) {
      toast.success(achState.message);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAchOpen(false);
    } else {
      toast.error(achState.message);
    }
  }, [achState]);

  useEffect(() => {
    if (!heroState.message) return;
    if (heroState.success) {
      toast.success(heroState.message);
    } else {
      toast.error(heroState.message);
    }
  }, [heroState]);

  useEffect(() => {
    if (!cvState.message) return;
    if (cvState.success) {
      toast.success(cvState.message);
    } else {
      toast.error(cvState.message);
    }
  }, [cvState]);

  if (!profile) {
    return (
      <div className="rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
        Profile record not found. Please seed the database first.
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Resume Database
        </h1>
        <p className="text-surface-400">
          View and manage the core structure of your professional CV.
        </p>
      </div>

      {/* Profile Assets */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-surface-700/50 pb-2">
          <h2 className="text-xl font-semibold text-white">Profile Assets</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-surface-700/50 bg-surface-900 p-5">
            <h3 className="text-sm font-semibold text-white">Hero Image</h3>
            <ImageUpload currentUrl={heroUrl} onUpload={setHeroUrl} />
            <form action={heroAction} className="flex justify-end">
              <input type="hidden" name="profileId" value={profile.id} />
              <input type="hidden" name="heroImageUrl" value={heroUrl} />
              <Button type="submit" disabled={heroPending || !heroUrl}>
                {heroPending ? "Saving..." : "Save Hero Image"}
              </Button>
            </form>
          </div>

          <div className="space-y-3 rounded-xl border border-surface-700/50 bg-surface-900 p-5">
            <h3 className="text-sm font-semibold text-white">CV (PDF)</h3>
            <DocumentUpload currentUrl={cvUrl} onUpload={setCvUrl} />
            <form action={cvAction} className="flex justify-end">
              <input type="hidden" name="profileId" value={profile.id} />
              <input type="hidden" name="cvUrl" value={cvUrl} />
              <Button type="submit" disabled={cvPending || !cvUrl}>
                {cvPending ? "Saving..." : "Save CV"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-surface-700/50 pb-2">
          <h2 className="text-xl font-semibold text-white">Experience</h2>
          <Button size="sm" variant="outline" onClick={() => setExpOpen(true)}>
            + Add Entry
          </Button>
        </div>
        <div className="grid gap-3">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-lg bg-surface-800 border border-surface-700/50"
            >
              <p className="font-medium text-white">{exp.title}</p>
              <p className="text-sm text-surface-400">
                {exp.subtitle} • {exp.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-surface-700/50 pb-2">
          <h2 className="text-xl font-semibold text-white">Education</h2>
          <Button size="sm" variant="outline" onClick={() => setEduOpen(true)}>
            + Add Entry
          </Button>
        </div>
        <div className="grid gap-3">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-lg bg-surface-800 border border-surface-700/50"
            >
              <p className="font-medium text-white">{edu.title}</p>
              <p className="text-sm text-surface-400">
                {edu.subtitle} • {edu.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-surface-700/50 pb-2">
          <h2 className="text-xl font-semibold text-white">
            Certifications & Achievements
          </h2>
          <Button size="sm" variant="outline" onClick={() => setAchOpen(true)}>
            + Add Entry
          </Button>
        </div>
        <div className="grid gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-lg bg-surface-800 border border-surface-700/50"
            >
              <p className="font-medium text-white">{ach.title}</p>
              <p className="text-sm text-surface-400">
                {ach.description} • {ach.year}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-surface-700/50 pb-2">
          <h2 className="text-xl font-semibold text-white">Skills Matrix</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1.5 rounded-full bg-surface-800 border border-surface-700/50 text-sm text-surface-200"
            >
              {skill.name}{" "}
              <span className="opacity-50 ml-1">({skill.category})</span>
            </span>
          ))}
        </div>
      </section>

      <Dialog open={expOpen} onOpenChange={setExpOpen}>
        <DialogContent className="sm:max-w-[560px] bg-surface-900 border-surface-700 text-surface-200 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Add Experience
            </DialogTitle>
            <DialogDescription className="text-surface-400">
              Add a new work or leadership entry.
            </DialogDescription>
          </DialogHeader>
          <form action={expAction} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="exp-title">Title *</Label>
              <Input id="exp-title" name="title" required />
              {expState.errors?.title && (
                <p className="text-xs text-error">{expState.errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-subtitle">Subtitle *</Label>
              <Input id="exp-subtitle" name="subtitle" required />
              {expState.errors?.subtitle && (
                <p className="text-xs text-error">{expState.errors.subtitle}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-period">Period *</Label>
              <Input
                id="exp-period"
                name="period"
                placeholder="Jan 2026 - Present"
                required
              />
              {expState.errors?.period && (
                <p className="text-xs text-error">{expState.errors.period}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-result">Result (optional)</Label>
              <Input id="exp-result" name="result" placeholder="Founder" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-icon">Icon name (optional)</Label>
              <Input id="exp-icon" name="iconName" placeholder="FaCode" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-details">Details (one per line)</Label>
              <Textarea id="exp-details" name="details" rows={4} />
            </div>
            <Separator className="bg-surface-700/50" />
            <div className="flex justify-end">
              <Button type="submit" disabled={expPending}>
                {expPending ? "Saving..." : "Save Experience"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={eduOpen} onOpenChange={setEduOpen}>
        <DialogContent className="sm:max-w-[560px] bg-surface-900 border-surface-700 text-surface-200 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Add Education
            </DialogTitle>
            <DialogDescription className="text-surface-400">
              Add a new education record.
            </DialogDescription>
          </DialogHeader>
          <form action={eduAction} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edu-title">Title *</Label>
              <Input id="edu-title" name="title" required />
              {eduState.errors?.title && (
                <p className="text-xs text-error">{eduState.errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-subtitle">Subtitle *</Label>
              <Input id="edu-subtitle" name="subtitle" required />
              {eduState.errors?.subtitle && (
                <p className="text-xs text-error">{eduState.errors.subtitle}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-period">Period *</Label>
              <Input
                id="edu-period"
                name="period"
                placeholder="2022 - 2026"
                required
              />
              {eduState.errors?.period && (
                <p className="text-xs text-error">{eduState.errors.period}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-result">Result (optional)</Label>
              <Input id="edu-result" name="result" placeholder="First Class" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-icon">Icon name (optional)</Label>
              <Input
                id="edu-icon"
                name="iconName"
                placeholder="FaGraduationCap"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-details">Details (one per line)</Label>
              <Textarea id="edu-details" name="details" rows={4} />
            </div>
            <Separator className="bg-surface-700/50" />
            <div className="flex justify-end">
              <Button type="submit" disabled={eduPending}>
                {eduPending ? "Saving..." : "Save Education"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={achOpen} onOpenChange={setAchOpen}>
        <DialogContent className="sm:max-w-[560px] bg-surface-900 border-surface-700 text-surface-200 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Add Certification
            </DialogTitle>
            <DialogDescription className="text-surface-400">
              Add a new certification or achievement.
            </DialogDescription>
          </DialogHeader>
          <form action={achAction} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="ach-title">Title *</Label>
              <Input id="ach-title" name="title" required />
              {achState.errors?.title && (
                <p className="text-xs text-error">{achState.errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ach-description">Issuer / Description *</Label>
              <Input id="ach-description" name="description" required />
              {achState.errors?.description && (
                <p className="text-xs text-error">
                  {achState.errors.description}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ach-year">Year *</Label>
              <Input
                id="ach-year"
                name="year"
                placeholder="Apr 2026"
                required
              />
              {achState.errors?.year && (
                <p className="text-xs text-error">{achState.errors.year}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ach-icon">Icon name (optional)</Label>
              <Input id="ach-icon" name="iconName" placeholder="FaAward" />
            </div>
            <Separator className="bg-surface-700/50" />
            <div className="flex justify-end">
              <Button type="submit" disabled={achPending}>
                {achPending ? "Saving..." : "Save Certification"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
