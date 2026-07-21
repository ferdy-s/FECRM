"use client";

import { BellOff } from "lucide-react";

export default function NotificationEmpty() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-10
        text-center
      "
    >
      <BellOff
        className="
          mb-3
          h-10
          w-10
          text-muted-foreground
        "
      />

      <h3 className="font-semibold">
        No Notifications
      </h3>

      <p
        className="
          mt-1
          text-sm
          text-muted-foreground
        "
      >
        You are all caught up.
      </p>
    </div>
  );
}