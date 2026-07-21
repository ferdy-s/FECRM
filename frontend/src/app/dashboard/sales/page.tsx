"use client";

import { useMemo } from "react";
import {
  BriefcaseBusiness,
  Handshake,
  Target,
  TrendingUp,
} from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { DashboardGreeting } from "@/features/dashboard/components/dashboard-greeting";
import { DashboardKPI } from "@/features/dashboard/components/dashboard-kpi";
import { NotificationsWidget } from "@/features/dashboard/components/notifications-widget";
import { PipelineTable } from "@/features/dashboard/components/pipeline-table";
import { RecentActivities } from "@/features/dashboard/components/recent-activities";
import { RevenueOverview } from "@/features/dashboard/components/revenue-overview";
import { SalesFunnel } from "@/features/dashboard/components/sales-funnel";

import { useDeals } from "@/hooks/use-deals";

export default function SalesDashboardPage() {
  const {
    data: deals = [],
    isLoading,
    error,
  } = useDeals();

 const summary = useMemo(() => {
  const totalDeals = deals.length;

  const negotiation = deals.filter(
    (deal) => deal.status === "NEGOTIATION",
  ).length;

  const won = deals.filter(
    (deal) => deal.status === "WON",
  ).length;

  const pipelineValue = deals.reduce(
    (total, deal) =>
      total + Number(deal.grandTotal ?? 0),
    0,
  );

  const collected = deals.reduce(
    (total, deal) =>
      total +
      Number(deal.collectedAmount ?? 0),
    0,
  );

  const outstanding = deals.reduce(
    (total, deal) =>
      total +
      Number(deal.outstandingAmount ?? 0),
    0,
  );

  const winRate =
    totalDeals === 0
      ? 0
      : (won / totalDeals) * 100;

  return {
    totalDeals,
    negotiation,
    won,
    pipelineValue,
    collected,
    outstanding,
    winRate,
  };
}, [deals]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          Loading Sales Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 text-red-500">
          Failed to load sales dashboard
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardGreeting />

      <DashboardKPI
        items={[
          {
            title: "My Deals",
            value: summary.totalDeals,
            description: "Assigned Deals",
            icon: (
              <BriefcaseBusiness className="h-5 w-5" />
            ),
          },
          {
            title: "Negotiation",
            value: summary.negotiation,
            description: "Active negotiations",
            icon: (
              <Handshake className="h-5 w-5" />
            ),
          },
          {
            title: "Won Deals",
            value: summary.won,
            description: "Successfully closed",
            icon: (
              <Target className="h-5 w-5" />
            ),
          },
          {
            title: "Win Rate",
            value: Number(
              summary.winRate.toFixed(2),
            ),
            suffix: "%",
            description: "Deal success rate",
            icon: (
              <TrendingUp className="h-5 w-5" />
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
  pipelineValue={summary.pipelineValue}
  collected={summary.collected}
  outstanding={summary.outstanding}
/>
        </div>

        <NotificationsWidget />
      </div>

      <div
        className="
          mt-6
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <SalesFunnel
          totalLead={summary.totalDeals}
          negotiation={summary.negotiation}
          won={summary.won}
        />

        <RecentActivities />
      </div>

      <div className="mt-6">
        <PipelineTable />
      </div>
    </DashboardLayout>
  );
}