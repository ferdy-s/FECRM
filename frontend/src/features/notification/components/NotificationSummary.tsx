"use client";

import {
  Notification,
} from "@/types/notification";

import {
  NotificationFilterValue,
  NotificationToolbar,
} from "./NotificationToolbar";

import {
  NotificationKPICards,
} from "./NotificationKPICards";

import {
  NotificationList,
} from "./NotificationList";

interface NotificationSummaryProps {

  notifications: Notification[];

  search: string;

  filter: NotificationFilterValue;

  isRefreshing: boolean;

  onSearchChange: (
    value: string,
  ) => void;

  onFilterChange: (
    value: NotificationFilterValue,
  ) => void;

  onRefresh: () => void;

}

export function NotificationSummary({

  notifications,

  search,

  filter,

  isRefreshing,

  onSearchChange,

  onFilterChange,

  onRefresh,

}: NotificationSummaryProps) {

  return (

    <div
      className="
        space-y-6
      "
    >

      <NotificationToolbar

        search={search}

        filter={filter}

        total={
          notifications.length
        }

        isRefreshing={
          isRefreshing
        }

        onSearchChange={
          onSearchChange
        }

        onFilterChange={
          onFilterChange
        }

        onRefresh={
          onRefresh
        }

      />

      <NotificationKPICards
        notifications={
          notifications
        }
      />

      <NotificationList
        notifications={
          notifications
        }
      />

    </div>

  );

}