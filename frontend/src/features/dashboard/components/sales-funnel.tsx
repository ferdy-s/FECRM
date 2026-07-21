"use client";

import {
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  totalLead: number;
  negotiation: number;
  won: number;
}

const chartConfig = {
  value: {
    label: "Leads",
    color: "hsl(var(--primary))",
  },
};

export function SalesFunnel({
  totalLead,
  negotiation,
  won,
}: Props) {

  const funnelData = [
    {
      stage: "Lead",
      value: totalLead,
      color:
        "bg-blue-100 text-blue-700",
    },

    {
      stage: "Negotiation",
      value: negotiation,
      color:
        "bg-orange-100 text-orange-700",
    },

    {
      stage: "Won",
      value: won,
      color:
        "bg-green-100 text-green-700",
    },
  ];

  /**
   * Funnel CRM selalu
   * menggunakan Total Lead
   * sebagai baseline.
   */
  const baseLead =
    totalLead > 0
      ? totalLead
      : 1;

  const conversionRate =
    totalLead > 0
      ? (
          (won / totalLead) *
          100
        ).toFixed(1)
      : "0.0";

  return (

    <Card className="h-full">

      <CardHeader>

        <CardTitle>

          Sales Funnel

        </CardTitle>

        <CardDescription>

          Lead conversion overview

        </CardDescription>

      </CardHeader>

      <CardContent
        className="
          space-y-6
        "
      >
        <ChartContainer
  config={chartConfig}
  className="
    mx-auto
    h-[320px]
    w-full
  "
>

  <RadarChart
    data={funnelData}
  >

    <ChartTooltip
      cursor={false}
      content={
        <ChartTooltipContent
          formatter={(value) => [
            `${value} Leads`,
            "Total",
          ]}
        />
      }
    />

    <PolarGrid
      gridType="polygon"
    />

    <PolarAngleAxis
      dataKey="stage"
      tick={{
        fontSize: 12,
        fontWeight: 500,
      }}
    />

    <Radar
      name="Leads"
      dataKey="value"
      stroke="hsl(var(--primary))"
      fill="hsl(var(--primary))"
      fillOpacity={0.25}
      strokeWidth={2}
    />

  </RadarChart>

</ChartContainer>

<div
  className="
    rounded-xl
    border
    bg-muted/30
    p-4
  "
>

  <div
    className="
      mb-4
      flex
      items-center
      justify-between
    "
  >

    <h4
      className="
        text-sm
        font-semibold
      "
    >

      Pipeline Summary

    </h4>

    <Badge
      variant="outline"
    >

      Conversion {conversionRate}%

    </Badge>

  </div>

  <div
    className="
      rounded-xl
      border
      bg-primary/5
      p-4
    "
  >

    <div
      className="
        flex
        items-center
        justify-between
      "
    >

      <span
        className="
          text-sm
          text-muted-foreground
        "
      >

        Overall Conversion Rate

      </span>

      <span
        className="
          text-xl
          font-bold
          text-primary
        "
      >

        {conversionRate}%

      </span>

    </div>

  </div>

</div>

</CardContent>

</Card>

);
}