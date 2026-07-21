"use client";

import type {
  Activity,
} from "@/types/activity";

import {
  ActivityToolbar,
  ActivityFilterValue,
} from "./ActivityToolbar";

import {
  ActivitySummaryCards,
} from "./ActivitySummaryCards";

import {
  ActivityContent,
} from "./ActivityContent";

import {
  ActivityTimeline,
} from "./ActivityTimeline";

import {
  ActivityTable,
} from "./ActivityTable";

interface ActivitySummaryProps {
  activities: Activity[];

  search: string;

  filter: ActivityFilterValue;

  isRefreshing: boolean;

  onSearchChange: (
    value: string
  ) => void;

  onFilterChange: (
    value: ActivityFilterValue
  ) => void;

  onRefresh: () => void;
}

export function ActivitySummary({
  activities,
  search,
  filter,
  isRefreshing,
  onSearchChange,
  onFilterChange,
  onRefresh,
}: ActivitySummaryProps) {
  return (
    <div className="space-y-6">
      <ActivityToolbar
        search={search}
        filter={filter}
        isRefreshing={isRefreshing}
        onSearchChange={
          onSearchChange
        }
        onFilterChange={
          onFilterChange
        }
        onRefresh={onRefresh}
      />

      <ActivitySummaryCards
        activities={activities}
      />

      <ActivityContent
        timeline={
          <ActivityTimeline
            activities={
              activities
            }
          />
        }
        table={
          <ActivityTable
            activities={
              activities
            }
          />
        }
      />
    </div>
  );
}