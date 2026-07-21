"use client";

import {
  UserPlus,
  Phone,
  Calendar,
  Receipt,
  CheckCircle,
  FileText,
} from "lucide-react";

import type {
  LeadDetail,
} from "@/types/lead-detail";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  Badge,
} from "@/components/ui/badge";

import {
  useLeadTimeline,
} from "@/hooks/use-lead-timeline";

interface Props {
  leadId: string;
}

interface TimelineActivity {
  id: string;
  leadId: string;
  userId: string;
  type: string;
  description: string;
  createdAt: string;

  user?: {
    id: string;
    email: string;
    role: string;
  };
}

function badgeVariant(
  type: string
) {
  switch (type) {
    case "ASSIGNMENT":
      return "bg-slate-500/10 text-slate-700";

    case "CALL":
      return "bg-indigo-500/10 text-indigo-600";

    case "MEETING":
      return "bg-cyan-500/10 text-cyan-600";

    case "INVOICE":
      return "bg-pink-500/10 text-pink-600";

    case "PAYMENT":
      return "bg-emerald-500/10 text-emerald-600";

    case "STATUS":
      return "bg-yellow-500/10 text-yellow-700";

    case "DEAL":
      return "bg-green-500/10 text-green-700";

    default:
      return "bg-muted text-muted-foreground";
  }
}

function getIcon(
  type: string
) {
  switch (type) {
    case "ASSIGNMENT":
      return UserPlus;

    case "CALL":
      return Phone;

    case "MEETING":
      return Calendar;

    case "INVOICE":
      return Receipt;

    case "PAYMENT":
      return CheckCircle;

    case "STATUS":
      return FileText;

    default:
      return FileText;
  }
}

export function LeadTimeline({
  leadId,
}: Props) {

  const {
    data = [],
    isLoading,
  } = useLeadTimeline(
    leadId
  );

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          Loading timeline...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">

      <CardHeader className="pb-3">

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>

            <CardTitle>
              Activity Timeline
            </CardTitle>

          </div>

          <Badge variant="secondary">
            {data.length} Activities
          </Badge>

        </div>

      </CardHeader>

      <CardContent>

        <ScrollArea
          className="
            h-[680px]
            pr-4
          "
        >

          <div className="relative">

            <div
              className="
                absolute
                left-[19px]
                top-0
                 h-[600px]
                w-px
                bg-border
              "
            />

            <div className="space-y-5">

             {data.map(
  (activity: TimelineActivity) => {

                  const Icon =
                    getIcon(
                      activity.type
                    );

                  return (

                    <div
                      key={activity.id}
                      className="
                        relative
                        flex
                        gap-4
                      "
                    >

                      <div
                        className="
                          relative
                          z-10
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          bg-background
                          shadow-sm
                        "
                      >
                        <Icon
                          className="
                            h-4
                            w-4
                          "
                        />
                      </div>

                      <div
                        className="
                          flex-1
                          rounded-xl
                          border
                          bg-card
                          p-4
                          hover:shadow-md
                        "
                      >

                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-4
                          "
                        >

                          <div>

                            <h4
                              className="
                                text-sm
                                font-semibold
                              "
                            >
                              {activity.type}
                            </h4>

                            <p
                              className="
                                mt-1
                                text-sm
                                text-muted-foreground
                              "
                            >
                              {
                                activity.description
                              }
                            </p>

                          </div>

                          <Badge
                            variant="outline"
                            className={badgeVariant(
                              activity.type
                            )}
                          >
                            {activity.type}
                          </Badge>

                        </div>

                        <div
                          className="
                            mt-3
                            flex
                            flex-wrap
                            items-center
                            gap-4
                            text-xs
                            text-muted-foreground
                          "
                        >

                          <span>
                            By{" "}
                            <strong>
                              {
                                activity.user
                                  ?.email ??
                                "-"
                              }
                            </strong>
                          </span>

                          <span>
                            {
                              new Date(
                                activity.createdAt
                              ).toLocaleString(
                                "id-ID"
                              )
                            }
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

      </CardContent>

    </Card>
  );
}