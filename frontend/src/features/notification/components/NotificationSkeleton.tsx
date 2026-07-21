"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({
        length: 4,
      }).map((_, index) => (
        <div
          key={index}
          className="space-y-2"
        >
          <Skeleton className="h-4 w-32" />

          <Skeleton className="h-3 w-full" />

          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}