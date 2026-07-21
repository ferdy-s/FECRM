import { useQuery } from "@tanstack/react-query";

import { paymentService } from "@/services/payment.service";

export function usePayment(
  paymentId: string,
) {
  return useQuery({
    queryKey: [
      "payment",
      paymentId,
    ],

    queryFn: () =>
      paymentService.getPayment(
        paymentId,
      ),

    enabled: !!paymentId,
  });
}