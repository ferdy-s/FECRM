"use client";

import {
  Users,
  BriefcaseBusiness,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

import {
  DashboardLayout,
} from "@/components/layout/dashboard-layout";

import {
  DashboardGreeting,
} from "@/features/dashboard/components/dashboard-greeting";

import {
  DashboardKPI,
} from "@/features/dashboard/components/dashboard-kpi";

import {
  RevenueOverview,
} from "@/features/dashboard/components/revenue-overview";

import {
  SalesFunnel,
} from "@/features/dashboard/components/sales-funnel";

import {
  RecentActivities,
} from "@/features/dashboard/components/recent-activities";

import {
  TopPerformance,
} from "@/features/dashboard/components/top-performance";

import {
  useAdminDashboard,
} from "@/hooks/use-admin-dashboard";

export default function AdminDashboardPage() {

  const {
    data,
    isLoading,
    error,
  } = useAdminDashboard();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          Loading Admin Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 text-red-500">
          Failed to load admin dashboard
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <DashboardGreeting />

     <DashboardKPI
      className="xl:grid-cols-3"
  items={[
    {
      title: "Total Users",

      value:
        data?.users.total ?? 0,

      description: "Registered users",

      icon: (
        <Users className="h-5 w-5" />
      ),
    },

    {
      title: "Active Deals",
  value: data?.sales?.totalDeals ?? 0,

      description: "Current pipeline",

      icon: (
        <BriefcaseBusiness className="h-5 w-5" />
      ),
    },
    {
      title: "System Health",

      value:
        data?.system.health ?? "Healthy",

      description: "Platform status",

      icon: (
        <ShieldCheck className="h-5 w-5" />
      ),
    },
  ]}
/>

      <div
        className="
          mt-6
          grid
          gap-6
          lg:grid-cols-3
        "
      >

        <div className="lg:col-span-2">

          <RevenueOverview
            pipelineValue={
              data?.deal.pipelineValue ?? 0
            }
            collected={
              data?.finance.collected ?? 0
            }
            outstanding={
              data?.finance.outstanding ?? 0
            }
          />

        </div>

        <SalesFunnel
          totalLead={
            data?.lead.total ?? 0
          }
          negotiation={
            data?.lead.negotiation ?? 0
          }
          won={
            data?.lead.won ?? 0
          }
        />

      </div>

      <div
        className="
          mt-6
          grid
          gap-6
          lg:grid-cols-2
        "
      >

        <TopPerformance />

        <RecentActivities />

      </div>

    </DashboardLayout>
  );
}