"use client";

import { Inbox } from "lucide-react";

interface ServiceEmptyProps {
  title?: string;
  description?: string;
}

export function ServiceEmpty({
  title = "No services found",
  description = "Create your first service to get started.",
}: ServiceEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Inbox className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}