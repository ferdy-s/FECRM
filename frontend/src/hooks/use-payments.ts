import { useQuery } from "@tanstack/react-query";

import { paymentService } from "@/services/payment.service";

import type { Payment } from "@/types/payment";

//////////////////////////////////////////////////////
// QUERY KEY
//////////////////////////////////////////////////////

export const PAYMENT_QUERY_KEY = ["payments"] as const;

//////////////////////////////////////////////////////
// HOOK
//////////////////////////////////////////////////////

export function usePayments() {
  return useQuery<Payment[]>({
    queryKey: PAYMENT_QUERY_KEY,

    queryFn: () =>
      paymentService.getPayments(),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,

    refetchOnMount: true,
  });
}