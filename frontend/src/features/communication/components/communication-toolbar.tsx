"use client";

import {
  RotateCw,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  CommunicationFilter,
} from ".";

interface CommunicationToolbarProps {
  search: string;

  onSearchChange: (
    value: string
  ) => void;

  onRefresh?: () => void;

  isRefreshing?: boolean;
}

export function CommunicationToolbar({
  search,
  onSearchChange,
  onRefresh,
  isRefreshing = false,
}: CommunicationToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex-1">
        <CommunicationFilter
          value={search}
          onChange={
            onSearchChange
          }
        />
      </div>

      <Button
        variant="outline"
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        <RotateCw
          className={`mr-2 h-4 w-4 ${
            isRefreshing
              ? "animate-spin"
              : ""
          }`}
        />

        Refresh
      </Button>
    </div>
  );
}