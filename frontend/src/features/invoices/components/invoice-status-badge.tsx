import {
  Badge,
} from "@/components/ui/badge";

import type {
  InvoiceStatus,
} from "@/types/invoice";

//////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////

interface Props {

  status: InvoiceStatus;

}

//////////////////////////////////////////////////////
// VARIANTS
//////////////////////////////////////////////////////

const variants: Record<
  InvoiceStatus,
  string
> = {

  DRAFT:
    "bg-slate-100 text-slate-700 border-slate-300",

  UNPAID:
    "bg-red-500/10 text-red-500 border-red-500/20",

  PARTIAL:
    "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",

  PAID:
    "bg-green-500/10 text-green-500 border-green-500/20",

  OVERDUE:
    "bg-orange-500/10 text-orange-500 border-orange-500/20",

  CANCELLED:
    "bg-muted text-muted-foreground border-border",

};

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export function InvoiceStatusBadge({
  status,
}: Props) {

  return (

    <Badge
      variant="outline"
      className={variants[status]}
    >

      {status}

    </Badge>

  );

}