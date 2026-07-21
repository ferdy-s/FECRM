import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type { InvoicePayment } from "@/types/invoice";

type PaymentStatus =
  InvoicePayment["status"];

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  PaymentStatus,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  PENDING: {
    label: "Pending",
    icon: Clock3,
    className:
      "border-yellow-200 bg-yellow-100 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  },

  VERIFIED: {
    label: "Verified",
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  },

  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    className:
      "border-red-200 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
  },
};

export function PaymentStatusBadge({
  status,
  className,
}: PaymentStatusBadgeProps) {
  const config =
    STATUS_CONFIG[status];

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={[
        "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium whitespace-nowrap",
        config.className,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon className="size-3.5 shrink-0" />

      <span>{config.label}</span>
    </Badge>
  );
}

export default PaymentStatusBadge;