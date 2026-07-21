import { useMutation, useQueryClient } from "@tanstack/react-query";

import { paymentService } from "@/services/payment.service";

import type {
  RejectPaymentRequest,
  RejectPaymentResponse,
} from "@/types/reject-payment";

export function useRejectPayment() {
  const queryClient = useQueryClient();

  return useMutation<
    RejectPaymentResponse,
    Error,
    RejectPaymentRequest
  >({
    mutationFn: paymentService.rejectPayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });

      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });

      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
  });
}