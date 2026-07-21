"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { DashboardGreeting } from "@/features/dashboard/components/dashboard-greeting";
import { DashboardKPI } from "@/features/dashboard/components/dashboard-kpi";
import { NotificationsWidget } from "@/features/dashboard/components/notifications-widget";
import { RecentActivities } from "@/features/dashboard/components/recent-activities";
import { RevenueOverview } from "@/features/dashboard/components/revenue-overview";
import { SalesFunnel } from "@/features/dashboard/components/sales-funnel";

import { useManagerDashboard } from "@/hooks/use-manager-dashboard";

import {
  BriefcaseBusiness,
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Skeleton,
} from "@/components/ui/skeleton";

export default function ManagerDashboardPage() {
  const {
    data,
    isLoading,
    error,
  } = useManagerDashboard();

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

            <Skeleton
              className="
                h-[380px]
                rounded-xl
                lg:col-span-2
              "
            />

            <Skeleton
              className="
                h-[380px]
                rounded-xl
              "
            />

          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            <Skeleton
              className="
                h-[480px]
                rounded-xl
              "
            />

            <Skeleton
              className="
                h-[480px]
                rounded-xl
              "
            />

          </div>

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

            <p
              className="
                text-lg
                font-medium
                text-destructive
              "
            >
              Failed to load manager dashboard.
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
      className="xl:grid-cols-3"
  items={[
    {
      title: "Pipeline Value",

      value: `Rp ${(
        data?.sales.pipelineValue ?? 0
      ).toLocaleString("id-ID")}`,

      description:
        "Current sales pipeline",

      icon: (
        <DollarSign className="h-5 w-5" />
      ),
    },

    {
      title: "Total Deals",

      value:
        data?.sales.totalDeals ?? 0,

      description:
        "All active deals",

      icon: (
        <BriefcaseBusiness className="h-5 w-5" />
      ),
    },

    {
      title: "Conversion Rate",

      value: `${
        (
          data?.conversion.rate ??
          0
        ).toFixed(2)
      }%`,

      description:
        "Lead to deal conversion",

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

            <RevenueOverview
              pipelineValue={
                data?.sales.pipelineValue ?? 0
              }
              collected={
                data?.finance.collected ?? 0
              }
              outstanding={
                data?.finance.outstanding ?? 0
              }
            />

          </div>

          <NotificationsWidget />

        </div>

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >

          <SalesFunnel
            totalLead={
              data?.pipeline.totalLead ?? 0
            }
            negotiation={
              data?.pipeline.negotiation ?? 0
            }
            won={
              data?.pipeline.won ?? 0
            }
          />

          <RecentActivities />

        </div>

      </div>

    </DashboardLayout>
  );
}