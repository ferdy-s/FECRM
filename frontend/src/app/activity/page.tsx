"use client";

import { useState } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import ActivityEmpty from "@/features/activity/components/ActivityEmpty";
import ActivitySkeleton from "@/features/activity/components/ActivitySkeleton";
import {
  ActivitySummary,
} from "@/features/activity/components/ActivitySummary";

import {
  ActivityFilterValue,
} from "@/features/activity/components/ActivityToolbar";

import {
  useActivities,
} from "@/hooks/use-activities";

export default function ActivitiesPage() {
  const {
    data: activities = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useActivities();

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<ActivityFilterValue>(
      "ALL"
    );

  const filteredActivities =
    activities.filter(
      (activity) => {
        const keyword =
          search
            .trim()
            .toLowerCase();

        const matchesSearch =
          keyword === "" ||
          activity.description
            .toLowerCase()
            .includes(keyword) ||
          activity.lead.name
            .toLowerCase()
            .includes(keyword) ||
          activity.lead.company
            ?.toLowerCase()
            .includes(keyword) ||
          activity.user.name
            .toLowerCase()
            .includes(keyword);

        const matchesFilter =
          filter === "ALL"
            ? true
            : activity.type ===
              filter;

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Activity Center
          </h1>

          <p
            className="
              text-muted-foreground
            "
          >
            CRM Timeline & Activity Logs
          </p>
        </div>

        {isLoading ? (
          <ActivitySkeleton />
        ) : isError ? (
          <ActivityEmpty />
        ) : (
          <ActivitySummary
            activities={
              filteredActivities
            }
            search={search}
            filter={filter}
            isRefreshing={
              isFetching
            }
            onSearchChange={
              setSearch
            }
            onFilterChange={
              setFilter
            }
            onRefresh={() =>
              refetch()
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
}