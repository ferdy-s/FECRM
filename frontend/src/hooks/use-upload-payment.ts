import { useMutation, useQueryClient } from "@tanstack/react-query";

import { paymentService } from "@/services/payment.service";

import type {
  UploadPaymentRequest,
  UploadPaymentResponse,
} from "@/types/create-payment";

export function useUploadPayment() {
  const queryClient = useQueryClient();

  return useMutation<
    UploadPaymentResponse,
    Error,
    UploadPaymentRequest
  >({
    mutationFn: (payload) =>
      paymentService.uploadPayment(payload),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["collections"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
  });
}