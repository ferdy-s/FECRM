"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { invoiceService } from "@/services/invoice.service";

export function useCreateInvoice() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      invoiceService.createInvoice,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
  });
}