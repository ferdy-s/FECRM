"use client";

import {
  ReactNode,
} from "react";

interface NotificationGroupProps {

  title: string;

  count: number;

  children: ReactNode;

}

export default function NotificationGroup({

  title,

  count,

  children,

}: NotificationGroupProps) {

  return (

    <section>

      <div
        className="
          sticky
          top-0
          z-10
          mb-3
          flex
          items-center
          justify-between
          border-b
          bg-background/95
          py-3
          backdrop-blur
          supports-[backdrop-filter]:bg-background/70
        "
      >

        <h2
          className="
            text-sm
            font-semibold
            tracking-wide
          "
        >

          {title}

        </h2>

        <span
          className="
            rounded-full
            bg-muted
            px-2.5
            py-1
            text-xs
            font-medium
            text-muted-foreground
          "
        >

          {count}

        </span>

      </div>

      <div
        className="
          space-y-3
        "
      >

        {children}

      </div>

    </section>

  );

}