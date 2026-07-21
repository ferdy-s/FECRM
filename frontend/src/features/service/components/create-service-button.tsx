"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ServiceDialog } from "./service-dialog";

export function CreateServiceButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />

        Create Service
      </Button>

      <ServiceDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}