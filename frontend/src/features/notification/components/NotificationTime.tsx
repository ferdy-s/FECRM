"use client";

import {
  Clock3,
} from "lucide-react";

import {
  formatRelativeTime,
} from "../utils/notification-date";

interface NotificationTimeProps {

  createdAt: string | Date;

}

export default function NotificationTime({

  createdAt,

}: NotificationTimeProps) {

  return (

    <div
      className="
        flex
        items-center
        gap-1.5
        text-xs
        text-muted-foreground
      "
    >

      <Clock3
        className="
          h-3.5
          w-3.5
        "
      />

      <span>

        {formatRelativeTime(
          createdAt
        )}

      </span>

    </div>

  );

}