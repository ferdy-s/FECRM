"use client";

import {
  Bell,
  BellDot,
  BellRing,
  CalendarDays,
} from "lucide-react";

import { startOfDay } from "date-fns";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Notification } from "@/types/notification";

interface NotificationKPICardsProps {
  notifications: Notification[];
}

export function NotificationKPICards({
  notifications,
}: NotificationKPICardsProps) {

  const total =
    notifications.length;

  const unread =
    notifications.filter(
      (notification) => !notification.isRead
    ).length;

  const read =
    notifications.filter(
      (notification) => notification.isRead
    ).length;

  const today =
    notifications.filter((notification) => {

      const created =
        new Date(notification.createdAt);

      return (
        created >=
        startOfDay(new Date())
      );

    }).length;

  const cards = [

    {
      title: "Total Notifications",
      value: total,
      icon: Bell,
    },

    {
      title: "Unread",
      value: unread,
      icon: BellRing,
    },

    {
      title: "Read",
      value: read,
      icon: BellDot,
    },

    {
      title: "Today",
      value: today,
      icon: CalendarDays,
    },

  ];

  return (

    <div
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      {cards.map((card) => {

        const Icon =
          card.icon;

        return (

          <Card
            key={card.title}
          >

            <CardContent
              className="
                flex
                items-center
                justify-between
                p-6
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >

                  {card.title}

                </p>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-bold
                  "
                >

                  {card.value}

                </h2>

              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                "
              >

                <Icon
                  className="
                    h-6
                    w-6
                    text-primary
                  "
                />

              </div>

            </CardContent>

          </Card>

        );

      })}

    </div>

  );

}