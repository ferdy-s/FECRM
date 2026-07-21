import { useMutation, useQueryClient } from "@tanstack/react-query";

import { paymentService } from "@/services/payment.service";

import type {
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from "@/types/verify-payment";

export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation<
    VerifyPaymentResponse,
    Error,
    VerifyPaymentRequest
  >({
    mutationFn: (payload) =>
      paymentService.verifyPayment(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });

      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });

      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
  });
}