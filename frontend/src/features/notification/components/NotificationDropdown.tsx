"use client";

import Link from "next/link";

import {
  Bell,
  ArrowRight,
} from "lucide-react";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  Button,
} from "@/components/ui/button";

import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./NotificationEmpty";
import NotificationGroup from "./NotificationGroup";

import {
  Notification,
} from "@/types/notification";

import {
  groupNotifications,
} from "../utils/notification-date";

interface NotificationDropdownProps {

  notifications: Notification[];

  isLoading: boolean;

}

const GROUP_ORDER = [

  "Today",

  "Yesterday",

  "This Week",

  "Older",

] as const;

export default function NotificationDropdown({

  notifications,

  isLoading,

}: NotificationDropdownProps) {

  if (isLoading) {

    return (

      <div
        className="
          p-6
          text-center
          text-sm
          text-muted-foreground
        "
      >

        Loading...

      </div>

    );

  }

  if (notifications.length === 0) {

    return <NotificationEmpty />;

  }

  const unread =
    notifications.filter(

      item => !item.isRead

    ).length;

  const latest =
    notifications.slice(0, 5);

  const groups =
    groupNotifications(latest);

  return (

    <div>

      {/* Header */}

      <div
        className="
          border-b
          p-4
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h3
              className="
                text-base
                font-semibold
              "
            >

              Notifications

            </h3>

            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >

              {unread} unread

            </p>

          </div>

          <Bell
            className="
              h-5
              w-5
              text-muted-foreground
            "
          />

        </div>

      </div>

      {/* List */}

      <ScrollArea
        className="
          h-[420px]
        "
      >

        <div
          className="
            p-4
          "
        >

          {GROUP_ORDER.map(

            group => {

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

                  count={items.length}

                >

                  {items.map(

                    notification => (

                      <NotificationItem

                        key={notification.id}

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

      </ScrollArea>

      {/* Footer */}

      <div
        className="
          border-t
          p-3
        "
      >

        <Button
          asChild
          variant="ghost"
          className="
            w-full
            justify-between
          "
        >

          <Link
            href="/notifications"
          >

            View All Notifications

            <ArrowRight
              className="
                h-4
                w-4
              "
            />

          </Link>

        </Button>

      </div>

    </div>

  );

}