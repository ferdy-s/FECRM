"use client";

import { useQuery } from "@tanstack/react-query";

import { invoiceService } from "@/services/invoice.service";

export function useInvoiceProgress(
  invoiceId: string,
) {
  return useQuery({
    queryKey: [
      "invoice-progress",
      invoiceId,
    ],

    enabled: !!invoiceId,

    queryFn: () =>
      invoiceService.getProgress(
        invoiceId,
      ),
  });
}