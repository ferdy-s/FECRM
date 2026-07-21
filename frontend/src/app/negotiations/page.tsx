"use client";

import {

  DashboardLayout,

} from "@/components/layout/dashboard-layout";

import {

  useNegotiationDashboard,

} from "@/hooks/use-negotiation-dashboard";

import {
  NegotiationHistoryTable,
} from "@/features/negotiation/components/negotiation-history-table";

import {
  useNegotiationHistory,
} from "@/hooks/use-negotiation-history";

import {

  Card,

  CardContent,

  CardDescription,

  CardHeader,

  CardTitle,

} from "@/components/ui/card";

import {

  Skeleton,

} from "@/components/ui/skeleton";

import {

  usePendingNegotiations,

} from "@/hooks/use-pending-negotiations";

import {

  NegotiationTable,

} from "@/features/negotiation/components/negotiation-table";

import {

  NegotiationKPI,

} from "@/features/negotiation/components/negotiation-kpi";

export default function NegotiationPage() {

  const {

    data: negotiations = [],

    isPending,

    isError,

  } = usePendingNegotiations();

  const {

  data: history = [],

  isPending: historyLoading,

} = useNegotiationHistory();

  const {

  data: dashboard,

} = useNegotiationDashboard();

  return (

    <DashboardLayout>

      <div
        className="
          space-y-6
        "
      >

        {/* ======================================================= */}
        {/* PAGE HEADER */}
        {/* ======================================================= */}

        <div>

          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
            "
          >

            Negotiation Queue

          </h1>

          <p
            className="
              mt-1
              text-muted-foreground
            "
          >

            Review, approve, or reject customer
            price negotiation requests submitted by
            the sales team.

          </p>

        </div>

        {/* ======================================================= */}
        {/* KPI */}
        {/* ======================================================= */}

       {dashboard && (

  <NegotiationKPI

    dashboard={dashboard}

  />

)}

      {/* ======================================================= */}
{/* NEGOTIATION QUEUE */}
{/* ======================================================= */}

{isPending ? (

  <Skeleton
    className="
      h-[600px]
      w-full
      rounded-xl
    "
  />

) : isError ? (

  <Card>

    <CardContent
      className="
        flex
        h-64
        items-center
        justify-center
      "
    >

      <div
        className="
          text-center
          text-destructive
        "
      >

        Failed to load negotiation requests.

      </div>

    </CardContent>

  </Card>

) : (

  <NegotiationTable

    negotiations={negotiations}

  />

)}

{/* ======================================================= */}
{/* APPROVAL HISTORY */}
{/* ======================================================= */}

{historyLoading ? (

  <Skeleton
    className="
      h-[650px]
      w-full
      rounded-xl
    "
  />

) : (

  <NegotiationHistoryTable

    negotiations={history}

  />

)}

      </div>

    </DashboardLayout>

  );

}