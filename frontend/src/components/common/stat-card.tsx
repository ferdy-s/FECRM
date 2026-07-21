import {
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: string;
  trendType?: "up" | "down";
  icon: React.ReactNode;
}

export function StatCard({
  title,
  value,
  description,
  trend,
  trendType,
  icon,
}: StatCardProps) {
  return (
    <Card
      className="
    border
    shadow-sm
    hover:shadow-md
    transition-all
  "
    >
      <CardContent className="px-7 py-1">
        <div className="flex items-center gap-4">
          {/* ICON BADGE */}

          <div
            className="
              flex
      h-14
      w-14
      shrink-0
      items-center
      justify-center
      rounded-xl
      bg-muted
            "
          >
            {icon}
          </div>

          {/* CONTENT */}

          <div className="flex-1 min-w-0">
            <p
              className="
                text-sm
        text-muted-foreground
              "
            >
              {title}
            </p>

            <h3
              className="
                text-3xl
        font-bold
        leading-none
              "
            >
              {value}
            </h3>

            <div
              className="
                flex
        items-center
        gap-2
        text-sm
              "
            >
              {trend && (
                <span
                  className={cn(
                    "flex items-center gap-1 font-semibold",
                    trendType === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {trendType === "up" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}

                  {trend}
                </span>
              )}

              {description && (
                <span
                  className="
                    text-muted-foreground
                    whitespace-nowrap
                  "
                >
                  {description}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}