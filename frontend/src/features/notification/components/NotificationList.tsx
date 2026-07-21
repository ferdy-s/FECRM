"use client";

import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./NotificationEmpty";
import NotificationGroup from "./NotificationGroup";

import {
  Notification,
} from "@/types/notification";

import {
  groupNotifications,
} from "../utils/notification-date";

interface NotificationListProps {

  notifications: Notification[];

}

const GROUP_ORDER = [

  "Today",

  "Yesterday",

  "This Week",

  "Older",

] as const;

export function NotificationList({

  notifications,

}: NotificationListProps) {

  if (notifications.length === 0) {

    return <NotificationEmpty />;

  }

  const groups =
    groupNotifications(
      notifications
    );

  return (

    <div
      className="
        space-y-8
      "
    >

      {GROUP_ORDER.map(

        (group) => {

          const items =
            groups[group];

          if (
            !items ||
            items.length === 0
          ) {

            return null;

          }

          return (

            <NotificationGroup

              key={group}

              title={group}

              count={
                items.length
              }

            >

              {items.map(

                (
                  notification
                ) => (

                  <NotificationItem

                    key={
                      notification.id
                    }

                    notification={
                      notification
                    }

                  />

                )

              )}

            </NotificationGroup>

          );

        }

      )}

    </div>

  );

}