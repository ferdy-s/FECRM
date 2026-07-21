"use client";

import { useQuery } from "@tanstack/react-query";

import { communicationService } from "@/services/communication-log.service";

import type {
  CommunicationHistoryParams,
} from "@/types/communication";

export function useCommunicationHistory(
  params: CommunicationHistoryParams
) {
  return useQuery({
    queryKey: [
      "communications",
      "history",
      params.leadId,
    ],

    queryFn: () =>
      communicationService.getHistory(params),

    enabled: Boolean(params.leadId),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
  });
}