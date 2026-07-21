"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  negotiationService,
} from "@/services/negotiation.service";

export function useNegotiationNotes(
  leadId: string,
) {

  return useQuery({

    queryKey: [
      "negotiation-notes",
      leadId,
    ],

    queryFn: () =>
      negotiationService.getNotes(
        leadId,
      ),

    enabled: !!leadId,

  });

}