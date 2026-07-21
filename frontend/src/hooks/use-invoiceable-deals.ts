"use client";

import { useQuery } from "@tanstack/react-query";
import { invoiceService } from "@/services/invoice.service";

export function useInvoiceableDeals() {
  return useQuery({
    queryKey: ["invoiceable-deals"],
    queryFn: () =>
      invoiceService.invoiceableDeals(),
  });
}