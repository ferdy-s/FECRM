"use client";

import {
  AlertTriangle,
  Trash2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useDeleteLeadSource } from "@/hooks/use-lead-source";

import type { LeadSource } from "@/types/lead-source";

interface DeleteLeadSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadSource: LeadSource | null;
}

export function DeleteLeadSourceDialog({
  open,
  onOpenChange,
  leadSource,
}: DeleteLeadSourceDialogProps) {
  const mutation = useDeleteLeadSource();

  const handleDelete = async () => {
    if (!leadSource) return;

    await mutation.mutateAsync(leadSource.id);

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Lead Source
          </DialogTitle>

          <DialogDescription>
            This action cannot be undone.
            <br />
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {leadSource?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={
              mutation.isPending || !leadSource
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />

            {mutation.isPending
              ? "Deleting..."
              : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}