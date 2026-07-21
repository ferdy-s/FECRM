"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

interface LeadSourceToolbarProps {
  search: string;

  onSearchChange: (
    value: string
  ) => void;

  onRefresh: () => void;

  onCreate: () => void;

  isRefreshing?: boolean;
}

export function LeadSourceToolbar({
  search,
  onSearchChange,
  onRefresh,
  onCreate,
  isRefreshing = false,
}: LeadSourceToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          placeholder="Search lead source..."
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          className="pl-9"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${
              isRefreshing
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh
        </Button>

        <Button
          type="button"
          onClick={onCreate}
        >
          <Plus className="mr-2 h-4 w-4" />

          New Source
        </Button>
      </div>
    </div>
  );
}