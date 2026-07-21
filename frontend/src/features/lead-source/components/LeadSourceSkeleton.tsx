"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function LeadSourceSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="border-b p-4">
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="divide-y">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-4"
          >
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-28" />
            </div>

            <div className="flex items-center gap-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}