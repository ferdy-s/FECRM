"use client";

import {
  TrendingUp,
  Wallet,
  Landmark,
  Percent,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type {
  Deal,
} from "@/types/deal";

interface Props {
  deal: Deal;
}

const currencyFormatter =
  new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  );

function currency(
  value?: number,
) {
  return currencyFormatter.format(
    Number(value ?? 0),
  );
}

export function DealSummaryCard({
  deal,
}: Props) {

  const dealValue =
    Number(deal.value ?? 0);

  const collected =
    Number(
      deal.collectedAmount ?? 0,
    );

  const outstanding =
    Number(
      deal.outstandingAmount ?? 0,
    );

  const collectionRate =
    dealValue <= 0
      ? 0
      : Math.min(
          (collected / dealValue) *
            100,
          100,
        );

  return (


      <CardContent
        className="
          grid
          gap-6
          p-5
          pb-5
          xl:grid-cols-4
        "
      >

        <SummaryItem
          icon={TrendingUp}
          title="Deal Value"
          value={currency(
            dealValue,
          )}
        />

        <SummaryItem
          icon={Wallet}
          title="Collected"
          value={currency(
            collected,
          )}
        />

        <SummaryItem
          icon={Landmark}
          title="Outstanding"
          value={currency(
            outstanding,
          )}
        />

        <SummaryItem
          icon={Percent}
          title="Collection Rate"
          value={`${collectionRate.toFixed(
            1,
          )}%`}
        />

      </CardContent>


  );

}

interface ItemProps {

  icon: LucideIcon;

  title: string;

  value: string;

}

function SummaryItem({

  icon: Icon,

  title,

  value,

}: ItemProps) {

  return (

    <div
      className="
        flex
        items-center
        gap-4
      "
    >

      <div
        className="
          rounded-xl
          bg-muted
          p-3
          text-primary
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
        "
      >

        <p
          className="
            text-xs
            text-muted-foreground
          "
        >
          {title}
        </p>

        <p
          className="
            truncate
            text-xl
            font-bold
          "
        >
          {value}
        </p>

      </div>

    </div>

  );

}