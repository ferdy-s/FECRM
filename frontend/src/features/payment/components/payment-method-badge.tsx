import {
  CreditCard,
  Landmark,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type { PaymentMethod } from "@/types/payment";

interface PaymentMethodBadgeProps {
  method: PaymentMethod;
  className?: string;
}

const PAYMENT_METHOD_CONFIG: Record<
  PaymentMethod,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  MANUAL_TRANSFER: {
    label: "Manual Transfer",
    icon: Landmark,
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  },

  QRIS_MIDTRANS: {
    label: "QRIS Midtrans",
    icon: Wallet,
    className:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300",
  },

};

export function PaymentMethodBadge({
  method,
  className,
}: PaymentMethodBadgeProps) {
  const config =
    PAYMENT_METHOD_CONFIG[method];

  if (!config) {
    return (
      <Badge
        variant="outline"
        className={className}
      >
        <CreditCard className="mr-1 h-3.5 w-3.5" />

        Unknown
      </Badge>
    );
  }

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={[
        "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
        config.className,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />

      <span className="truncate">
        {config.label}
      </span>
    </Badge>
  );
}

export default PaymentMethodBadge;