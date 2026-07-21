"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import type { Activity } from "@/types/activity";

import { getActivityBadgeClass } from "../utils/activity-color";
import { formatActivityDate } from "../utils/activity-format";
import { getActivityIcon } from "../utils/activity-icon";

interface ActivityTimelineProps {
  activities: Activity[];
}

export function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold">
          Activity Timeline
        </h2>

        <p className="text-sm text-muted-foreground">
          Latest CRM activities
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-320px)] min-h-[500px]">
        <div className="p-6">
          <div className="space-y-6">
            {activities.map(
              (activity, index) => {
                const Icon =
                  getActivityIcon(
                    activity.type
                  );

                const isLast =
                  index ===
                  activities.length - 1;

                return (
                  <div
                    key={activity.id}
                    className="relative flex gap-4"
                  >
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          bg-background
                          shadow-sm
                        "
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {!isLast && (
                        <div className="mt-2 h-full w-px bg-border" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/40">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          className={getActivityBadgeClass(
                            activity.type
                          )}
                        >
                          {activity.type}
                        </Badge>

                        <span className="text-xs text-muted-foreground">
                          {formatActivityDate(
                            activity.createdAt
                          )}
                        </span>
                      </div>

                      <h3 className="mt-3 font-semibold">
                        {activity.lead.company ??
                          activity.lead.name}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {activity.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>
                          {activity.user.name}
                        </span>

                        <span>•</span>

                        <span>
                          {activity.user.role}
                        </span>

                        <span>•</span>

                        <span>
                          {activity.lead.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}