"use client";

import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useRefreshOverdue } from "@/hooks/use-report";

export function RefreshOverdueButton() {

  const mutation = useRefreshOverdue();

  return (

    <Button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className="gap-2"
    >

      <RotateCw
        className={`h-4 w-4 ${
          mutation.isPending
            ? "animate-spin"
            : ""
        }`}
      />

      {mutation.isPending
        ? "Refreshing..."
        : "Refresh Overdue"}

    </Button>

  );

}