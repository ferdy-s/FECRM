"use client";

import Link from "next/link";

import {
  Bell,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import NotificationTime
from "@/features/notification/components/NotificationTime";

import NotificationEmpty
from "@/features/notification/components/NotificationEmpty";

import {
  useNotifications,
} from "@/hooks/use-notifications";

export function NotificationsWidget() {

  const {

    data: notifications = [],

    isLoading,

  } = useNotifications();

  if (isLoading) {

    return (

      <Card>

        <CardHeader>

          <CardTitle>

            Notifications

          </CardTitle>

        </CardHeader>

        <CardContent>

          <div
            className="
              space-y-3
            "
          >

            {Array.from({

              length: 5,

            }).map((_, index) => (

              <div

                key={index}

                className="
                  h-14
                  animate-pulse
                  rounded-xl
                  bg-muted
                "
              />

            ))}

          </div>

        </CardContent>

      </Card>

    );

  }

  const latest =
    notifications.slice(0, 5);

  return (

    <Card>

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
        "
      >

        <CardTitle>

          Notifications

        </CardTitle>

        <Button
          asChild
          size="sm"
          variant="ghost"
        >

          <Link
            href="/notifications"
          >

            View All

            <ArrowRight
              className="
                ml-2
                h-4
                w-4
              "
            />

          </Link>

        </Button>

      </CardHeader>

      <CardContent>

        {latest.length === 0 ? (

          <NotificationEmpty />

        ) : (

          <div
            className="
              space-y-3
            "
          >

            {latest.map(

              (notification) => (

                <div

                  key={
                    notification.id
                  }

                  className={`
                    rounded-xl
                    border
                    p-3
                    transition-colors
                    hover:bg-muted/40

                    ${
                      notification.isRead

                        ? ""

                        : "border-primary bg-primary/5"

                    }
                  `}
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        min-w-0
                        flex-1
                        items-start
                        gap-3
                      "
                    >

                      <Bell
                        className="
                          mt-0.5
                          h-4
                          w-4
                          shrink-0
                          text-primary
                        "
                      />

                      <div
                        className="
                          min-w-0
                        "
                      >

                        <h4
                          className={`
                            truncate
                            text-sm

                            ${
                              notification.isRead

                                ? "font-medium"

                                : "font-semibold"

                            }
                          `}
                        >

                          {notification.title}

                        </h4>

                        <p
                          className="
                            mt-1
                            line-clamp-2
                            text-xs
                            text-muted-foreground
                          "
                        >

                          {notification.message}

                        </p>

                      </div>

                    </div>

                    <NotificationTime
                      createdAt={
                        notification.createdAt
                      }
                    />

                  </div>

                </div>

              )

            )}

          </div>

        )}

      </CardContent>

    </Card>

  );

}