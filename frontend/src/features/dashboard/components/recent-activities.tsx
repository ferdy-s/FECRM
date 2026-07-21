"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Activity,
  ArrowRight,
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  StickyNote,
  UserCheck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

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
  Skeleton,
} from "@/components/ui/skeleton";

import {
  useActivities,
} from "@/hooks/use-activities";

import type {
  Activity as ActivityModel,
  ActivityType,
} from "@/types/activity";

const PAGE_SIZE = 5;

function getActivityIcon(
  type: ActivityType,
) {

  switch (type) {

    case "CALL":
      return Phone;

    case "EMAIL":
      return Mail;

    case "MEETING":
      return Calendar;

    case "NOTE":
      return StickyNote;

    case "COMMUNICATION":
      return MessageCircle;

    case "ASSIGNMENT":
      return UserCheck;

    case "FINANCE":
      return Wallet;

    case "STATUS":
      return Activity;

    default:
      return Activity;

  }

}

function getBadgeClass(
  type: ActivityType,
) {

  switch (type) {

    case "CALL":
      return "bg-blue-100 text-blue-700";

    case "EMAIL":
      return "bg-purple-100 text-purple-700";

    case "MEETING":
      return "bg-orange-100 text-orange-700";

    case "NOTE":
      return "bg-pink-100 text-pink-700";

    case "STATUS":
      return "bg-green-100 text-green-700";

    case "COMMUNICATION":
      return "bg-cyan-100 text-cyan-700";

    case "ASSIGNMENT":
      return "bg-yellow-100 text-yellow-700";

    case "FINANCE":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "";

  }

}

export function RecentActivities() {

  const {

    data: activities = [],

    isLoading,

    isError,

    refetch,

  } = useActivities();

  const [

    page,

    setPage,

  ] = useState(1);

  const totalPages =
    Math.max(

      1,

      Math.ceil(

        activities.length /

        PAGE_SIZE,

      ),

    );

  const paginatedActivities =
    useMemo(() => {

      const start =

        (page - 1) *

        PAGE_SIZE;

      return activities.slice(

        start,

        start + PAGE_SIZE,

      );

    }, [

      activities,

      page,

    ]);

  if (isLoading) {

    return (

      <Card className="h-full">

        <CardHeader>

          <Skeleton className="h-6 w-48" />

        </CardHeader>

        <CardContent className="space-y-4">

          {

            Array.from({

              length: PAGE_SIZE,

            }).map((_, index) => (

              <Skeleton

                key={index}

                className="h-24 rounded-xl"

              />

            ))

          }

        </CardContent>

      </Card>

    );

  }

  if (isError) {

    return (

      <Card className="h-full">

        <CardContent
          className="
            flex
            h-[420px]
            flex-col
            items-center
            justify-center
            gap-4
          "
        >

          <p className="text-destructive">

            Failed to load activities.

          </p>

          <Button

            variant="outline"

            onClick={() =>

              void refetch()

            }

          >

            Retry

          </Button>

        </CardContent>

      </Card>

    );

  }

  return (
    <Card className="h-full">

  <CardHeader
    className="
      flex
      flex-row
      items-center
      justify-between
      border-b
      pb-4
    "
  >

    <CardTitle
      className="
        text-lg
        font-semibold
      "
    >

      Recent Activities

    </CardTitle>

    <Button
      variant="ghost"
      size="sm"
      className="gap-1"
    >

      View All

      <ArrowRight
        className="
          h-4
          w-4
        "
      />

    </Button>

  </CardHeader>

  <CardContent
    className="
      p-0
    "
  >

    <ScrollArea
      className="
        h-[420px]
      "
    >

      <div
        className="
          space-y-4
          p-6
        "
      >

        {

          paginatedActivities.length === 0 ? (

            <div
              className="
                flex
                h-[320px]
                items-center
                justify-center
              "
            >

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >

                No recent activities.

              </p>

            </div>

          ) : (

            paginatedActivities.map(

              (
                activity: ActivityModel,
              ) => {

                const Icon =
                  getActivityIcon(
                    activity.type,
                  );

                return (

                  <div

                    key={activity.id}

                    className="
                      rounded-xl
                      border
                      p-4
                      transition-all
                      hover:bg-muted/40
                      hover:shadow-sm
                    "

                  >

                    <div
                      className="
                        flex
                        gap-4
                      "
                    >

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-muted
                        "
                      >

                        <Icon
                          className="
                            h-5
                            w-5
                          "
                        />

                      </div>

                      <div
                        className="
                          min-w-0
                          flex-1
                          space-y-2
                        "
                      >

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                          "
                        >

                          <Badge
                            variant="secondary"
                            className={
                              getBadgeClass(
                                activity.type,
                              )
                            }
                          >

                            {activity.type}

                          </Badge>

                          <span
                            className="
                              text-xs
                              text-muted-foreground
                            "
                          >

                            {

                              new Date(

                                activity.createdAt,

                              ).toLocaleString(

                                "id-ID",

                                {

                                  day: "2-digit",

                                  month: "short",

                                  year: "numeric",

                                  hour: "2-digit",

                                  minute: "2-digit",

                                },

                              )

                            }

                          </span>

                        </div>

                        <p
                          className="
                            text-sm
                            font-medium
                            leading-relaxed
                          "
                        >

                          {activity.description}

                        </p>

                        <div
                          className="
                            flex
                            flex-col
                            gap-1
                            text-xs
                            text-muted-foreground
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                          "
                        >

                          <span>

                            Lead :

                            {" "}

                            <strong>

                              {

                                activity.lead.company ??

                                activity.lead.name

                              }

                            </strong>

                          </span>

                          <span>

                            By

                            {" "}

                            <strong>

                              {

                                activity.user.name

                              }

                            </strong>

                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                );

              },

            )

          )

        }

      </div>

    </ScrollArea>

      <div
  className="
    flex
    flex-col
    gap-4
    border-t
    px-6
    py-4
    sm:flex-row
    sm:items-center
    sm:justify-between
  "
>

  <p
    className="
      text-sm
      text-muted-foreground
    "
  >

    Showing{" "}

    {(page - 1) * PAGE_SIZE + 1}

    {" - "}

    {Math.min(
      page * PAGE_SIZE,
      activities.length,
    )}

    {" of "}

    {activities.length}

    {" activities"}

  </p>

  <div
    className="
      flex
      items-center
      gap-3
    "
  >

    <Button
      variant="outline"
      size="sm"
      disabled={page === 1}
      onClick={() =>
        setPage(page - 1)
      }
    >
      Prev
    </Button>

    <span
      className="
        min-w-[90px]
        text-center
        text-sm
        font-medium
      "
    >
      Page {page} / {totalPages}
    </span>

    <Button
      variant="outline"
      size="sm"
      disabled={page === totalPages}
      onClick={() =>
        setPage(page + 1)
      }
    >
      Next
    </Button>

  </div>

</div>

  </CardContent>

</Card>

);
}