"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { LeadSourceForm } from "../forms/LeadSourceForm";

import {
  useUpdateLeadSource,
} from "@/hooks/use-lead-source";

import type {
  LeadSource,
} from "@/types/lead-source";

import type {
  CreateLeadSourceSchema,
} from "@/schemas/lead-source.schema";

interface EditLeadSourceDialogProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  leadSource: LeadSource | null;
}

export function EditLeadSourceDialog({
  open,
  onOpenChange,
  leadSource,
}: EditLeadSourceDialogProps) {
  const mutation =
    useUpdateLeadSource();

  const handleSubmit = async (
    values: CreateLeadSourceSchema
  ) => {
    if (!leadSource) {
      return;
    }

    await mutation.mutateAsync({
      id: leadSource.id,

      payload: {
        name: values.name,
      },
    });

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Edit Lead Source
          </DialogTitle>

          <DialogDescription>
            Update the selected lead source.
          </DialogDescription>
        </DialogHeader>

        {leadSource && (
          <LeadSourceForm
            defaultValues={{
              name: leadSource.name,
            }}
            onSubmit={handleSubmit}
            onCancel={() =>
              onOpenChange(false)
            }
            isSubmitting={
              mutation.isPending
            }
            submitLabel="Update"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}