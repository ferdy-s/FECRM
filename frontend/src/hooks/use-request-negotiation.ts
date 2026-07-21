"use client";

import {
  AxiosError,
} from "axios";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  toast,
} from "sonner";

import {
  dealService,
} from "@/services/deal.service";

import type {
  NegotiationActionResponse,
  RequestNegotiationRequest,
} from "@/types/negotiation";

export function useRequestNegotiation() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
  payload: RequestNegotiationRequest,
) =>
  dealService.requestNegotiation(payload),

    onSuccess: () => {

      toast.success(
        "Negotiation request submitted.",
      );

      queryClient.invalidateQueries({
        queryKey: ["deal"],
      });

      queryClient.invalidateQueries({
        queryKey: ["deals"],
      });

      queryClient.invalidateQueries({
        queryKey: ["negotiations"],
      });

    },

    onError: (
      error: AxiosError<
        NegotiationActionResponse
      >,
    ) => {

      toast.error(

        error.response?.data?.message ??

        "Failed to submit negotiation.",

      );

    },

  });

}