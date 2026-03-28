"use client";

import { useActionState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { saveProject, type ProjectActionState } from "../actions";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: any | null; // Drizzle Project type
}

const initialState: ProjectActionState = {
  success: false,
  message: "",
};

export function ProjectDialog({ open, onOpenChange, project }: ProjectDialogProps) {
  const [state, formAction, isPending] = useActionState(saveProject, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        onOpenChange(false); // Close dialog on success
      } else {
        toast.error(state.message);
      }
    }
  }, [state, onOpenChange]);

  const isEdit = !!project;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-surface-900 border-surface-700 text-surface-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isEdit ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription className="text-surface-400">
            {isEdit ? "Update the details for this project." : "Create a new portfolio project mapping."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-6 mt-4 max-h-[70vh] overflow-y-auto px-1 scrollbar-thin">
          {/* Hidden ID field for Edit mode */}
          {isEdit && <input type="hidden" name="id" value={project.id} />}
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-surface-300">Project Title *</Label>
            <Input 
              id="title" 
              name="title" 
              defaultValue={project?.title || ""} 
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white" 
              required 
            />
            {state.errors?.title && <p className="text-xs text-error">{state.errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-surface-300">Description *</Label>
            <Textarea 
              id="description" 
              name="description" 
              defaultValue={project?.description || ""} 
              rows={4} 
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white resize-y" 
              required 
            />
            {state.errors?.description && <p className="text-xs text-error">{state.errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-surface-300">Image URL</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              defaultValue={project?.imageUrl || ""} 
              placeholder="https://cloudinary.com/..." 
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white" 
            />
            {state.errors?.imageUrl && <p className="text-xs text-error">{state.errors.imageUrl}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="text-surface-300">GitHub URL</Label>
              <Input 
                id="githubUrl" 
                name="githubUrl" 
                defaultValue={project?.githubUrl || ""} 
                placeholder="https://github.com/..." 
                className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl" className="text-surface-300">Live URL</Label>
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
            <Label htmlFor="tags" className="text-surface-300">Tags (comma-separated)</Label>
            <Input 
              id="tags" 
              name="tags" 
              defaultValue={project?.tags?.join(", ") || ""} 
              placeholder="React, Next.js, TailwindCss" 
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack" className="text-surface-300">Tech Stack (comma-separated)</Label>
            <Input 
              id="techStack" 
              name="techStack" 
              defaultValue={project?.techStack?.join(", ") || ""} 
              placeholder="PostgreSQL, Express.js" 
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features" className="text-surface-300">Features (comma-separated)</Label>
            <Textarea 
              id="features" 
              name="features" 
              defaultValue={project?.features?.join(", ") || ""} 
              placeholder="User Authentication, Payment Processing" 
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white" 
              rows={3} 
            />
          </div>

          <div className="flex items-center gap-4 bg-surface-800 p-4 rounded-lg border border-surface-700">
            <div className="flex-1 space-y-1">
              <Label htmlFor="featured" className="text-white font-medium">Featured Project</Label>
              <p className="text-xs text-surface-400">Display this project prominently on the homepage.</p>
            </div>
            <Switch id="featured" name="featured" defaultChecked={project?.featured || false} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sortOrder" className="text-surface-300">Sort Order</Label>
            <Input 
              id="sortOrder" 
              name="sortOrder" 
              type="number" 
              defaultValue={project?.sortOrder || 0} 
              className="bg-surface-800 border-surface-600 focus:border-brand-400 text-white w-32" 
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-surface-700/50 mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-surface-600 text-surface-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-brand-500 hover:bg-brand-600 text-white">
              {isPending ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
