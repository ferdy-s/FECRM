"use client";

import {
  Building2,
  Calendar,
  Eye,
  Receipt,
 Wallet,
  CreditCard,
  Landmark,
  BadgeDollarSign,
} from "lucide-react";

import type {
  InvoiceColumn,
} from "./invoice-column-types";

export const invoiceColumns: InvoiceColumn[] = [
  {
    key: "invoiceNumber",
    label: "Invoice",
    icon: Receipt,
    sortable: true,
    mobile: true,
  },

  {
    key: "company",
    label: "Customer",
    icon: Building2,
    sortable: true,
    mobile: true,
  },

  {
    key: "amount",
    label: "Amount",
    icon: Wallet,
    align: "right",
    sortable: true,
  },

  {
    key: "paymentType",
    label: "Payment Type",
    icon: CreditCard,
  },

  {
    key: "paymentMethod",
    label: "Payment Method",
    icon: Landmark,
  },

  {
    key: "invoiceKind",
    label: "Invoice Kind",
    icon: BadgeDollarSign,
  },

  {
    key: "status",
    label: "Status",
    sortable: true,
  },

  {
    key: "issuedAt",
    label: "Issued",
    icon: Calendar,
    sortable: true,
  },

  {
    key: "action",
    label: "Actions",
    icon: Eye,
    align: "center",
    mobile: true,
  },
];