"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { DashboardGreeting } from "@/features/dashboard/components/dashboard-greeting";
import { DashboardKPI } from "@/features/dashboard/components/dashboard-kpi";
import { NotificationsWidget } from "@/features/dashboard/components/notifications-widget";
import { PipelineTable } from "@/features/dashboard/components/pipeline-table";
import { RecentActivities } from "@/features/dashboard/components/recent-activities";

import { useMarketingDashboard } from "@/hooks/use-marketing-dashboard";

import {
  BriefcaseBusiness,
  TrendingUp,
  Users,
  UserPlus,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Skeleton,
} from "@/components/ui/skeleton";

export default function MarketingDashboardPage() {
  const {
    data,
    isLoading,
    error,
  } = useMarketingDashboard();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">

          <Skeleton className="h-10 w-72" />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-32 rounded-xl"
              />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            <Skeleton className="h-[520px] lg:col-span-2 rounded-xl" />

            <Skeleton className="h-[520px] rounded-xl" />

          </div>

          <Skeleton className="h-[620px] rounded-xl" />

        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>

        <Card>

          <CardContent
            className="
              flex
              h-72
              items-center
              justify-center
            "
          >

            <p className="text-destructive text-lg font-medium">
              Failed to load marketing dashboard.
            </p>

          </CardContent>

        </Card>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <DashboardGreeting />

       <DashboardKPI
  items={[
    {
      title: "Total Leads",

      value:
        data?.lead.total ?? 0,

      description:
        "All marketing leads",

      icon: (
        <Users className="h-5 w-5" />
      ),
    },

    {
      title: "Assigned Leads",

      value:
        data?.lead.assigned ?? 0,

      description:
        "Assigned by manager",

      icon: (
        <BriefcaseBusiness className="h-5 w-5" />
      ),
    },

    {
      title: "New Leads",

      value:
        data?.lead.new ?? 0,

      description:
        "Created this period",

      icon: (
        <UserPlus className="h-5 w-5" />
      ),
    },

    {
      title: "Assignment Rate",

      value: `${
        data?.lead.total
          ? (
              (data.lead.assigned /
                data.lead.total) *
              100
            ).toFixed(2)
          : "0.00"
      }%`,

      description:
        "Assigned lead ratio",

      icon: (
        <TrendingUp className="h-5 w-5" />
      ),
    },
  ]}
/>

        <div
          className="
            grid
            gap-6
            lg:grid-cols-3
          "
        >

          <div className="lg:col-span-2">

            <PipelineTable />

          </div>

          <NotificationsWidget />

        </div>

        <RecentActivities />

      </div>

    </DashboardLayout>
  );
}