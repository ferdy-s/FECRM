"use client";

import { useQuery } from "@tanstack/react-query";

import { invoiceService } from "@/services/invoice.service";

export function useInvoice(
  invoiceId: string,
) {
  return useQuery({
    queryKey: [
      "invoice",
      invoiceId,
    ],

    enabled: !!invoiceId,

    queryFn: () =>
  invoiceService.getBreakdown(invoiceId),
  });
}