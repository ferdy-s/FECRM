"use client";

import { useQuery } from "@tanstack/react-query";

import { invoiceService } from "@/services/invoice.service";

export function useOverdueInvoices() {
  return useQuery({
    queryKey: [
      "overdue-invoices",
    ],

    queryFn: () =>
      invoiceService.getOverdueInvoices(),
  });
}