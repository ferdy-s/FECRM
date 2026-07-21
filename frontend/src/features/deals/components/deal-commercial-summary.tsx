import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Progress,
} from "@/components/ui/progress";

import {
  ReceiptText,
  BadgePercent,
  Wallet,
  CircleDollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/currency";

import type {
  Deal,
} from "@/types/deal";

interface Props {
  deal: Deal;
}

export function DealCommercialSummary({
  deal,
}: Props) {

  const collectedPercent =
    deal.grandTotal > 0
      ? Math.min(
          100,
          Math.round(
            (deal.collectedAmount /
              deal.grandTotal) *
              100,
          ),
        )
      : 0;

  return (
      <CardContent>

        <div className="grid gap-4 lg:grid-cols-12">

          <SummaryCard
            className="lg:col-span-3"
            icon={
              <ReceiptText className="h-5 w-5 text-muted-foreground" />
            }
            title="Subtotal"
            value={formatCurrency(
              deal.subtotal,
            )}
          />

          <SummaryCard
            className="lg:col-span-3"
            icon={
              <BadgePercent className="h-5 w-5 text-orange-500" />
            }
            title="Discount"
            value={formatCurrency(
              deal.discountAmount,
            )}
            valueClassName="text-orange-600"
          />

          <SummaryCard
            className="border-primary lg:col-span-6"
            icon={
              <CircleDollarSign className="h-5 w-5 text-primary" />
            }
            title="Grand Total"
            value={formatCurrency(
              deal.grandTotal,
            )}
            valueClassName="text-primary"
            large
          />

          <SummaryCard
            className="lg:col-span-4"
            icon={
              <TrendingUp className="h-5 w-5 text-green-600" />
            }
            title="Collected"
            value={formatCurrency(
              deal.collectedAmount,
            )}
            valueClassName="text-green-600"
          />

          <SummaryCard
            className="lg:col-span-4"
            icon={
              <AlertCircle className="h-5 w-5 text-red-600" />
            }
            title="Outstanding"
            value={formatCurrency(
              deal.outstandingAmount,
            )}
            valueClassName="text-red-600"
          />

          <Card className="lg:col-span-4">

            <CardContent className="space-y-4 p-5">

              <div className="flex items-center gap-2">

                <Wallet className="h-5 w-5 text-muted-foreground" />

                <span className="text-sm font-medium">

                  Collection Progress

                </span>

              </div>

              <Progress
                value={
                  collectedPercent
                }
              />

              <div className="flex justify-between text-xs text-muted-foreground">

                <span>

                  {collectedPercent}%

                </span>

                <span>

                  {formatCurrency(
                    deal.collectedAmount,
                  )}

                  {" / "}

                  {formatCurrency(
                    deal.grandTotal,
                  )}

                </span>

              </div>

            </CardContent>

          </Card>

        </div>

      </CardContent>

  );

}

interface SummaryCardProps {

  title: string;

  value: string;

  icon: React.ReactNode;

  className?: string;

  valueClassName?: string;

  large?: boolean;

}

function SummaryCard({

  title,

  value,

  icon,

  className,

  valueClassName,

  large,

}: SummaryCardProps) {

  return (

    <Card className={className}>

      <CardContent className="p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-muted-foreground">

              {title}

            </p>

            <p
              className={`mt-3 font-bold ${
                large
                  ? "text-3xl"
                  : "text-2xl"
              } ${valueClassName ?? ""}`}
            >

              {value}

            </p>

          </div>

          {icon}

        </div>

      </CardContent>

    </Card>

  );

}