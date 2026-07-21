"use client";

import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ActivitySearch } from "./ActivitySearch";
import { ActivityFilters } from "./ActivityFilters";

export type ActivityFilterValue =
  | "ALL"
  | "SYSTEM"
  | "NOTE"
  | "STATUS"
  | "ASSIGNMENT"
  | "COMMUNICATION"
  | "NEGOTIATION"
  | "FINANCE"
  | "CALL"
  | "MEETING"
  | "EMAIL";

interface ActivityToolbarProps {
  search: string;
  filter: ActivityFilterValue;
  isRefreshing: boolean;

  onSearchChange: (value: string) => void;
  onFilterChange: (
    value: ActivityFilterValue
  ) => void;

  onRefresh: () => void;
}

export function ActivityToolbar({
  search,
  filter,
  isRefreshing,
  onSearchChange,
  onFilterChange,
  onRefresh,
}: ActivityToolbarProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-xl
        border
        bg-card
        p-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <ActivitySearch
        value={search}
        onChange={onSearchChange}
      />

      <div className="flex items-center gap-2">
        <ActivityFilters
          value={filter}
          onChange={onFilterChange}
        />

        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RotateCw
            className={`h-4 w-4 ${
              isRefreshing
                ? "animate-spin"
                : ""
            }`}
          />
        </Button>
      </div>
    </div>
  );
}