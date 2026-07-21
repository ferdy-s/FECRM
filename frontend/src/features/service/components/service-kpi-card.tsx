"use client";

import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceKpiCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
}

export function ServiceKpiCard({
  title,
  value,
  icon,
  description,
}: ServiceKpiCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>

        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold tracking-tight">
          {value}
        </div>

        {description && (
          <p className="mt-2 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}