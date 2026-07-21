//////////////////////////////////////////////////////
// IMPORTS
//////////////////////////////////////////////////////

import {
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  type LucideIcon,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format";

import type { Payment } from "@/types/payment";

//////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////

interface PaymentSummaryCardsProps {
  payments: Payment[];
}

interface SummaryCardProps {
  title: string;

  value: string;

  description: string;

  icon: LucideIcon;

  iconClassName?: string;

  valueClassName?: string;
}

//////////////////////////////////////////////////////
// SUMMARY CARD COMPONENT
//////////////////////////////////////////////////////

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  valueClassName,
}: SummaryCardProps) {
  return (
    <Card
      className="
        h-full
        transition-all
        duration-200
        hover:shadow-md
        hover:border-primary/30
      "
    >
      <CardHeader
        className="
          flex
          flex-row
          items-start
          justify-between
          space-y-0
          pb-3
        "
      >
        <div className="space-y-1">
          <CardTitle
            className="
              text-sm
              font-medium
              text-muted-foreground
            "
          >
            {title}
          </CardTitle>

          <p
            className="
              text-xs
              text-muted-foreground
              line-clamp-2
            "
          >
            {description}
          </p>
        </div>

        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            iconClassName,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>

      <CardContent>
        <div
          className={cn(
            "break-all text-2xl font-bold tracking-tight",
            valueClassName,
          )}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

//////////////////////////////////////////////////////
// MAIN COMPONENT
//////////////////////////////////////////////////////

export function PaymentSummaryCards({
  payments,
}: PaymentSummaryCardsProps) {
  //////////////////////////////////////////////////////
  // SUMMARY
  //////////////////////////////////////////////////////

  const totalPayments = payments.length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "PENDING",
  ).length;

  const verifiedPayments = payments.filter(
    (payment) => payment.status === "VERIFIED",
  ).length;

  const rejectedPayments = payments.filter(
    (payment) => payment.status === "REJECTED",
  ).length;

  const totalAmount = payments.reduce(
    (total, payment) => total + Number(payment.amount),
    0,
  );

  //////////////////////////////////////////////////////
  // ITEMS
  //////////////////////////////////////////////////////

  const items: SummaryCardProps[] = [
    {
      title: "Total Payments",
      value: totalPayments.toLocaleString(),

      description: "All uploaded payments",

      icon: CreditCard,

      iconClassName:
        "bg-primary/10 text-primary",

      valueClassName:
        "text-foreground",
    },

    {
      title: "Pending",

      value: pendingPayments.toLocaleString(),

      description:
        "Waiting for verification",

      icon: Clock3,

      iconClassName:
        "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",

      valueClassName:
        "text-yellow-600 dark:text-yellow-400",
    },

    {
      title: "Verified",

      value:
        verifiedPayments.toLocaleString(),

      description:
        "Successfully verified",

      icon: CheckCircle2,

      iconClassName:
        "bg-green-500/10 text-green-600 dark:text-green-400",

      valueClassName:
        "text-green-600 dark:text-green-400",
    },

    {
      title: "Rejected",

      value:
        rejectedPayments.toLocaleString(),

      description:
        "Rejected by finance",

      icon: XCircle,

      iconClassName:
        "bg-red-500/10 text-red-600 dark:text-red-400",

      valueClassName:
        "text-red-600 dark:text-red-400",
    },

    {
      title: "Total Amount",

      value: formatCurrency(totalAmount),

      description:
        "Accumulated payment value",

      icon: CircleDollarSign,

      iconClassName:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400",

      valueClassName:
        "text-blue-600 dark:text-blue-400",
    },
  ];

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2

        xl:grid-cols-5
      "
    >
      {items.map((item) => (
        <SummaryCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  );
}