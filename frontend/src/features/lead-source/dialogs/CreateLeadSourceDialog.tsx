"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { LeadSourceForm } from "../forms/LeadSourceForm";

import { useCreateLeadSource } from "@/hooks/use-lead-source";

import type {
  CreateLeadSourceSchema,
} from "@/schemas/lead-source.schema";

export function CreateLeadSourceDialog() {
  const [open, setOpen] = useState(false);

  const mutation = useCreateLeadSource();

  const handleSubmit = async (
    values: CreateLeadSourceSchema
  ) => {
    await mutation.mutateAsync({
      name: values.name,
    });

    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Source
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Create Lead Source
          </DialogTitle>

          <DialogDescription>
            Add a new lead source that can be
            selected when creating leads.
          </DialogDescription>
        </DialogHeader>

        <LeadSourceForm
          defaultValues={{
            name: "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isSubmitting={mutation.isPending}
          submitLabel="Create"
        />
      </DialogContent>
    </Dialog>
  );
}