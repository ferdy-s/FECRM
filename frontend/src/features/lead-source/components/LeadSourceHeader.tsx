"use client";

import { Database } from "lucide-react";

interface LeadSourceHeaderProps {
  total?: number;
}

export function LeadSourceHeader({
  total,
}: LeadSourceHeaderProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-6">
      <div className="flex items-center gap-3">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Lead Sources
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage all lead acquisition sources used by
            your sales and marketing teams.
          </p>
        </div>
      </div>

      {typeof total === "number" && (
        <p className="text-sm text-muted-foreground">
          Total Sources{" "}
          <span className="font-semibold text-foreground">
            {total}
          </span>
        </p>
      )}
    </div>
  );
}