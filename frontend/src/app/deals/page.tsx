"use client";

import {
  DashboardLayout,
} from "@/components/layout/dashboard-layout";

import {
  useDeals,
} from "@/hooks/use-deals";

import {
  DealTable,
} from "@/features/deals/components/deal-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DealsPage() {

  const {
    data: deals = [],
    isLoading,
  } = useDeals();

  return (

    <DashboardLayout>

      <div className="space-y-6">

          <CardContent>

            {isLoading ? (

              <div className="py-12 text-center">
                Loading deals...
              </div>

            ) : (

              <DealTable
                deals={deals}
              />

            )}

          </CardContent>

      </div>

    </DashboardLayout>

  );

}