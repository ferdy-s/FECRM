"use client";

import type { Activity } from "@/types/activity";

interface ActivitySummaryCardsProps {
  activities: Activity[];
}

export function ActivitySummaryCards({
  activities,
}: ActivitySummaryCardsProps) {
  const total = activities.length;

  const negotiations = activities.filter(
    (activity) => activity.type === "NEGOTIATION"
  ).length;

  const finances = activities.filter(
    (activity) => activity.type === "FINANCE"
  ).length;

  const systems = activities.filter(
    (activity) => activity.type === "SYSTEM"
  ).length;

  const cards = [
    {
      title: "Total Activities",
      value: total,
    },
    {
      title: "Negotiation",
      value: negotiations,
    },
    {
      title: "Finance",
      value: finances,
    },
    {
      title: "System",
      value: systems,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-card p-5 transition-colors hover:bg-muted/40"
        >
          <p className="text-sm text-muted-foreground">
            {card.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}