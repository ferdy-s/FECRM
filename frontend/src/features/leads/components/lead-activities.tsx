"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  Badge,
} from "@/components/ui/badge";

interface Activity {
  id: string;
  leadId: string;
  userId: string;
  type: string;
  description: string;
  createdAt: string;
}

interface Props {
  activities: Activity[];
}

export function LeadActivities({
  activities,
}: Props) {
  return (
    <Card className="h-full">

      <CardHeader>
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <CardTitle>
            Activities
          </CardTitle>

          <Badge variant="secondary">
            {activities.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>

        {activities.length === 0 ? (
          <div
            className="
              flex
              h-[240px]
              items-center
              justify-center
              text-sm
              text-muted-foreground
            "
          >
            No activity found
          </div>
        ) : (
          <ScrollArea
            className="
              h-[420px]
              pr-4
            "
          >
            <div className="space-y-4">

              {activities.map(
                (activity) => (
                  <div
                    key={activity.id}
                    className="
                      rounded-lg
                      border
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <Badge>
                        {activity.type}
                      </Badge>

                      <span
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        {new Date(
                          activity.createdAt
                        ).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <p
                      className="
                        mt-2
                        text-sm
                      "
                    >
                      {activity.description}
                    </p>

                  </div>
                )
              )}

            </div>
          </ScrollArea>
        )}

      </CardContent>

    </Card>
  );
}