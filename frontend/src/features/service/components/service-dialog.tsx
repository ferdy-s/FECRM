"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ServiceForm } from "./service-form";

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceDialog({
  open,
  onOpenChange,
}: ServiceDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Create Service
          </DialogTitle>
        </DialogHeader>

        <ServiceForm
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}