"use client";

import { useParams } from "next/navigation";

import {
  DashboardLayout,
} from "@/components/layout/dashboard-layout";

import {
  DealCommercialSummary,
} from "@/features/deals/components/deal-commercial-summary";

import {
  useDeal,
} from "@/hooks/use-deal";

import {
  DealHeader,
} from "@/features/deals/components/deal-header";

import {
  DealSummaryCard,
} from "@/features/deals/components/deal-summary-card";

import {
  TransactionItemTable,
} from "@/features/deals/components/transaction-item-table";

import {
  InvoiceSummaryCard,
} from "@/features/deals/components/invoice-summary-card";

import {
  DealCommercialNegotiationCard,
} from "@/features/deals/components/deal-commercial-negotiation-card";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Skeleton,
} from "@/components/ui/skeleton";

import {
  AlertCircle,
} from "lucide-react";

export default function DealDetailPage() {

  const params =
    useParams();

  const dealId =
    params.id as string;

  const {

    data: deal,

    isLoading,

    isError,

  } = useDeal(
    dealId,
  );

  if (isLoading) {

    return (

      <DashboardLayout>

        <div className="space-y-6">

          <Skeleton className="h-36 w-full rounded-xl" />

          <Skeleton className="h-40 w-full rounded-xl" />

          <Skeleton className="h-[380px] w-full rounded-xl" />

          <Skeleton className="h-60 w-full rounded-xl" />

        </div>

      </DashboardLayout>

    );

  }

  if (isError || !deal) {

    return (

      <DashboardLayout>

        <Card>

          <CardContent
            className="
              flex
              h-52
              flex-col
              items-center
              justify-center
              gap-4
            "
          >

            <AlertCircle
              className="
                h-10
                w-10
                text-destructive
              "
            />

            <div
              className="
                text-center
              "
            >

              <h2
                className="
                  text-lg
                  font-semibold
                "
              >
                Deal not found
              </h2>

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                Failed to load Deal Detail.
              </p>

            </div>

          </CardContent>

        </Card>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div
        className="
          space-y-6
        "
      >

        {/* HEADER */}

        <DealHeader
          deal={deal}
        />

        {/* KPI */}

        {/* <DealSummaryCard
          deal={deal}
        /> */}

        <DealCommercialSummary
  deal={deal}
/>

{deal.status !== "WON" &&
 deal.status !== "LOST" && (
  <DealCommercialNegotiationCard
    deal={deal}
  />
)}


        {/* MAIN */}

        <div
          className="
            grid
            gap-6
            xl:grid-cols-3
          "
        >

          {/* LEFT */}

          <div
            className="
              space-y-6
              xl:col-span-2
            "
          >

            <TransactionItemTable
              deal={deal}
            />

          </div>

          {/* RIGHT */}

          <div
            className="
              space-y-6
            "
          >

            <InvoiceSummaryCard
              deal={deal}
            />

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}