"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  invoiceService,
} from "@/services/invoice.service";

export function useInvoiceBreakdown(
  invoiceId: string,
) {

  return useQuery({

    queryKey: [
      "invoice-breakdown",
      invoiceId,
    ],

    enabled:
      !!invoiceId,

    queryFn: () =>
      invoiceService.getBreakdown(
        invoiceId,
      ),

  });

}