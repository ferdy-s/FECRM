"use client";

import { useQuery } from "@tanstack/react-query";

import { invoiceService } from "@/services/invoice.service";

export function useInvoiceTerms(
  invoiceId: string,
) {
  return useQuery({
    queryKey: [
      "invoice-terms",
      invoiceId,
    ],

    enabled: !!invoiceId,

    queryFn: () =>
      invoiceService.getTerms(
        invoiceId,
      ),
  });
}