import type { LucideIcon } from "lucide-react";

import {
  BadgeCheck,
  BadgeDollarSign,
  CalendarDays,
  CreditCard,
  FileText,
  ShieldCheck,
  UserCheck,
  UserRound,
} from "lucide-react";

//////////////////////////////////////////////////////
// COLUMN TYPE
//////////////////////////////////////////////////////

export interface PaymentColumn {
  key:
    | "invoiceNumber"
    | "amount"
    | "paymentMethod"
    | "status"
    | "uploadedBy"
    | "verifiedBy"
    | "createdAt"
    | "verifiedAt"
    | "action";

  label: string;

  align?: "left" | "center" | "right";

  sortable?: boolean;

  visible?: boolean;

  icon?: LucideIcon;
}

// COLUMN CONFIG

export const paymentColumns: PaymentColumn[] = [
  {
    key: "invoiceNumber",
    label: "Invoice",
    icon: FileText,
    sortable: true,
    visible: true,
  },
  {
    key: "amount",
    label: "Amount",
    align: "right",
    icon: BadgeDollarSign,
    sortable: true,
    visible: true,
  },
  {
    key: "paymentMethod",
    label: "Method",
    align: "center",
    icon: CreditCard,
    sortable: true,
    visible: true,
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    icon: BadgeCheck,
    sortable: true,
    visible: true,
  },
  {
    key: "uploadedBy",
    label: "Uploaded By",
    icon: UserRound,
    sortable: false,
    visible: true,
  },
  {
    key: "verifiedBy",
    label: "Verified By",
    icon: UserCheck,
    sortable: false,
    visible: true,
  },
  {
    key: "createdAt",
    label: "Created",
    icon: CalendarDays,
    sortable: true,
    visible: true,
  },
  {
    key: "verifiedAt",
    label: "Verified At",
    icon: ShieldCheck,
    sortable: true,
    visible: true,
  },
  {
    key: "action",
    label: "Action",
    align: "center",
    sortable: false,
    visible: true,
  },
];