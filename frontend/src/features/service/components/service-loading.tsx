"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ServiceLoading() {
  return (
    <div className="rounded-xl border bg-background">
      <div className="space-y-4 p-6">
        <Skeleton className="h-10 w-full" />

        <Skeleton className="h-10 w-full" />

        <Skeleton className="h-10 w-full" />

        <Skeleton className="h-10 w-full" />

        <Skeleton className="h-10 w-full" />

        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}