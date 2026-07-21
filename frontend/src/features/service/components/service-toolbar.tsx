"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ServiceToolbarProps {
  onCreate?: () => void;
}

export function ServiceToolbar({
  onCreate,
}: ServiceToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Services
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage all services available in your CRM.
        </p>
      </div>

      <Button
        onClick={onCreate}
      >
        <Plus className="mr-2 h-4 w-4" />

        Add Service
      </Button>
    </div>
  );
}