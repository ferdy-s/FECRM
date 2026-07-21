"use client";

import type { ReactNode } from "react";

import { StatCard } from "@/components/common/stat-card";
import { cn } from "@/lib/utils";

export interface DashboardKPIItem {
  title: string;
  value: string | number | null | undefined;
  description: string;
  icon: ReactNode;
  prefix?: string;
  suffix?: string;
}

interface DashboardKPIProps {
  items: DashboardKPIItem[];
  className?: string;
}

function formatValue(item: DashboardKPIItem): string {
  const {
    value,
    prefix = "",
    suffix = "",
  } = item;

  if (value == null) {
    return "-";
  }

  if (typeof value === "number") {
    return `${prefix}${value.toLocaleString("id-ID")}${suffix}`;
  }

  return `${prefix}${value}${suffix}`;
}

export function DashboardKPI({
  items,
  className,
}: DashboardKPIProps) {
  return (
    <section
      className={cn(
        `
          grid
          gap-6
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
        `,
        className,
      )}
    >
      {items.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={formatValue(item)}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </section>
  );
}