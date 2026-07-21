"use client";

import { useState } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import NotificationEmpty from "@/features/notification/components/NotificationEmpty";
import NotificationSkeleton from "@/features/notification/components/NotificationSkeleton";
import {
  NotificationSummary,
} from "@/features/notification/components/NotificationSummary";

import {
  NotificationFilterValue,
} from "@/features/notification/components/NotificationToolbar";

import {
  useNotifications,
} from "@/hooks/use-notifications";

export default function NotificationsPage() {
  const {
    data: notifications = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useNotifications();

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<NotificationFilterValue>(
      "ALL"
    );

  const filteredNotifications =
    notifications.filter(
      (notification) => {
        const keyword =
          search
            .trim()
            .toLowerCase();

        const matchesSearch =
          keyword === "" ||
          notification.title
            .toLowerCase()
            .includes(keyword) ||
          notification.message
            .toLowerCase()
            .includes(keyword);

        const matchesFilter =
          filter === "ALL"
            ? true
            : filter === "READ"
            ? notification.isRead
            : !notification.isRead;

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
            Notification Center
          </h1>

          <p
            className="
              text-muted-foreground
            "
          >
            Activity & System Alerts
          </p>
        </div>

        {isLoading ? (
          <NotificationSkeleton />
        ) : isError ? (
          <NotificationEmpty />
        ) : (
          <NotificationSummary
            notifications={
              filteredNotifications
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