"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ServiceKPISkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border p-6"
        >
          <Skeleton className="mb-4 h-4 w-28" />

          <Skeleton className="mb-2 h-8 w-36" />

          <Skeleton className="h-3 w-44" />
        </div>
      ))}
    </div>
  );
}