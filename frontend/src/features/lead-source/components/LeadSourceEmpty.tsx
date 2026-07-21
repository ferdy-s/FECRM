"use client";

import { Database } from "lucide-react";

import { Button } from "@/components/ui/button";

interface LeadSourceEmptyProps {
  onCreate?: () => void;
}

export function LeadSourceEmpty({
  onCreate,
}: LeadSourceEmptyProps) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed bg-background px-6 py-12 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Database className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-xl font-semibold">
        No Lead Sources Found
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        There are no lead sources available yet.
        Create your first lead source to start
        organizing where your leads come from.
      </p>

      {onCreate && (
        <Button
          className="mt-6"
          onClick={onCreate}
        >
          Create Lead Source
        </Button>
      )}
    </div>
  );
}