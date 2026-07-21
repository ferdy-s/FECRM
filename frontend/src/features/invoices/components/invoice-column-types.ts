import type { LucideIcon } from "lucide-react";

export interface InvoiceColumn {
  key:
    | "invoiceNumber"
    | "company"
    | "amount"
    | "paymentType"
    | "paymentMethod"
    | "invoiceKind"
    | "status"
    | "issuedAt"
    | "action";

  label: string;

  icon?: LucideIcon;

  align?: "left" | "center" | "right";

  mobile?: boolean;

  sortable?: boolean;
}

export type VisibleColumns = Record<
  InvoiceColumn["key"],
  boolean
>;