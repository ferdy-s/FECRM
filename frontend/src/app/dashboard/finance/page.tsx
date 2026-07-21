"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { DashboardGreeting } from "@/features/dashboard/components/dashboard-greeting";
import { NotificationsWidget } from "@/features/dashboard/components/notifications-widget";
import { RecentActivities } from "@/features/dashboard/components/recent-activities";

import { FinanceKPICards } from "@/features/report/components/FinanceKPICards";
import { CollectionDashboardCards } from "@/features/report/components/CollectionDashboardCards";
import { AgingCards } from "@/features/report/components/AgingCards";

export default function FinanceDashboardPage() {
  return (
    <DashboardLayout>
      <DashboardGreeting />

      <div className="mt-6">
        <FinanceKPICards />
      </div>

      <div className="mt-6">
        <CollectionDashboardCards />
      </div>

      <div className="mt-6">
        <AgingCards />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <NotificationsWidget />

        <RecentActivities />
      </div>
    </DashboardLayout>
  );
}