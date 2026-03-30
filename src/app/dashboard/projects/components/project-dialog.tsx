"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { saveProject, type ProjectActionState } from "../actions";
import { ImageUpload } from "./image-upload";
import type { Project } from "@/types";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
}

const initialState: ProjectActionState = {
  success: false,
  message: "",
};

function getArray(val: unknown): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Ignored
    }
  }
  return [];
}

export function ProjectDialog({
  open,
  onOpenChange,
  project,
}: ProjectDialogProps) {
  const [state, formAction, isPending] = useActionState(
    saveProject,
    initialState,
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>(() =>
    getArray(project?.galleryImages),
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        onOpenChange(false);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, onOpenChange]);

  const isEdit = !!project;
  const imageUrl = uploadedImageUrl ?? project?.imageUrl ?? "";

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setUploadedImageUrl(null);
      setGalleryImages(getArray(project?.galleryImages));
    }
    onOpenChange(nextOpen);
  };

  const updateGalleryImage = (index: number, nextUrl: string) => {
    if (!nextUrl.trim()) {
      setGalleryImages((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    setGalleryImages((prev) =>
      prev.map((url, i) => (i === index ? nextUrl : url)),
    );
  };

  const addGallerySlot = () => {
    setGalleryImages((prev) => [...prev, ""]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const galleryPayload = JSON.stringify(galleryImages.filter(Boolean));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[640px] bg-surface-900 border-surface-700 text-surface-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isEdit ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription className="text-surface-400">
            {isEdit
              ? "Update the details for this project."
              : "Create a new portfolio project."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-6 mt-4">
          {isEdit && <input type="hidden" name="id" value={project.id} />}
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <input type="hidden" name="galleryImages" value={galleryPayload} />

          <div className="space-y-2">
            <Label htmlFor="title" className="text-surface-300">
              Project Title *
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={project?.title || ""}
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white"
              required
            />
            {state.errors?.title && (
              <p className="text-xs text-error">{state.errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-surface-300">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project?.description || ""}
              rows={3}
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white resize-y"
              required
            />
            {state.errors?.description && (
              <p className="text-xs text-error">{state.errors.description}</p>
            )}
          </div>

          <Separator className="bg-surface-700/50" />

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-surface-300">Project Image</Label>
            <ImageUpload currentUrl={imageUrl} onUpload={setUploadedImageUrl} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Label className="text-surface-300">Project Gallery</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addGallerySlot}
                className="border-surface-600 text-surface-300 hover:text-white"
              >
                Add Gallery Image
              </Button>
            </div>

            {galleryImages.length === 0 ? (
              <p className="text-xs text-surface-500 border border-surface-700 rounded-md px-3 py-2">
                Add one or more gallery screenshots to show on the project details page.
              </p>
            ) : (
              <div className="space-y-4">
                {galleryImages.map((url, index) => (
                  <div
                    key={`${url}-${index}`}
                    className="space-y-2 border border-surface-700 rounded-lg p-3 bg-surface-800/40"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-surface-400">
                        Gallery image {index + 1}
                      </p>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeGalleryImage(index)}
                        className="text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                    <ImageUpload
                      currentUrl={url}
                      onUpload={(nextUrl) => updateGalleryImage(index, nextUrl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="bg-surface-700/50" />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="text-surface-300">
                GitHub URL
              </Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                defaultValue={project?.githubUrl || ""}
                placeholder="https://github.com/..."
                className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl" className="text-surface-300">
                Live URL
              </Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                defaultValue={project?.liveUrl || ""}
                placeholder="https://..."
                className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-surface-300">
              Tags (comma-separated)
            </Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={getArray(project?.tags).join(", ")}
              placeholder="Full Stack, API, SaaS"
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack" className="text-surface-300">
              Tech Stack (comma-separated)
            </Label>
            <Input
              id="techStack"
              name="techStack"
              defaultValue={getArray(project?.techStack).join(", ")}
              placeholder="React, Node.js, PostgreSQL"
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features" className="text-surface-300">
              Features (comma-separated)
            </Label>
            <Textarea
              id="features"
              name="features"
              defaultValue={getArray(project?.features).join(", ")}
              placeholder="User Authentication, Payment Processing"
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white"
              rows={2}
            />
          </div>

          <div className="flex items-center gap-4 bg-surface-800 p-4 rounded-lg border border-surface-700">
            <div className="flex-1 space-y-1">
              <Label htmlFor="featured" className="text-white font-medium">
                Featured Project
              </Label>
              <p className="text-xs text-surface-400">
                Display this project prominently on the homepage.
              </p>
            </div>
            <Switch
              id="featured"
              name="featured"
              defaultChecked={project?.featured || false}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sortOrder" className="text-surface-300">
              Sort Order
            </Label>
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={project?.sortOrder || 0}
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white w-32"
            />
          </div>

          <Separator className="bg-surface-700/50" />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-surface-600 text-surface-300 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              {isPending ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
