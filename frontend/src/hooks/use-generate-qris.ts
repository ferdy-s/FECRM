"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { paymentService } from "@/services/payment.service";

export function useGenerateQris() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      invoiceId: string,
    ) =>
      paymentService.generateQris(
        invoiceId,
      ),

    onSuccess: async (_, invoiceId) => {

      await Promise.all([

        queryClient.invalidateQueries({

          queryKey: [
            "invoices",
          ],

        }),

        queryClient.invalidateQueries({

          queryKey: [
            "invoice",
            invoiceId,
          ],

        }),

      ]);

    },

  });

}