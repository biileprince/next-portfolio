"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { deleteProject } from "../actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
}

export function DeleteDialog({
  open,
  onOpenChange,
  project,
}: DeleteDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!project) return;

    startTransition(async () => {
      const res = await deleteProject(project.id);
      if (res.success) {
        toast.success(res.message);
        onOpenChange(false);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-surface-900 border-surface-700 text-surface-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-surface-400">
            This action cannot be undone. This will permanently delete the
            project
            <strong className="text-white mx-1">
              &quot;{project?.title}&quot;
            </strong>
            and remove it from your portfolio database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            className="bg-surface-800 text-white border-surface-600 hover:bg-surface-700 hover:text-white"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="bg-error hover:bg-error/90 text-white"
          >
            {isPending ? "Deleting..." : "Delete Project"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
