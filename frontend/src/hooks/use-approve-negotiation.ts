"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  negotiationService,
} from "@/services/negotiation.service";

import type {
  ApproveNegotiationRequest,
} from "@/types/negotiation";

export function useApproveNegotiation() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      payload: ApproveNegotiationRequest,
    ) =>
      negotiationService.approve(
        payload,
      ),

    onSuccess: async () => {

      await Promise.all([

        queryClient.invalidateQueries({
          queryKey: [
            "pending-negotiations",
          ],
        }),

        queryClient.invalidateQueries({
          queryKey: [
            "negotiation-dashboard",
          ],
        }),

        queryClient.invalidateQueries({
          queryKey: [
            "negotiation-history",
          ],
        }),

        queryClient.invalidateQueries({
          queryKey: [
            "deals",
          ],
        }),

      ]);

    },

  });

}