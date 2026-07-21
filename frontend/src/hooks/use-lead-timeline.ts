"use client";

import { useQuery }
from "@tanstack/react-query";

import {
  leadService,
} from "@/services/lead.service";

export function useLeadTimeline(
  leadId: string
) {
  return useQuery({
    queryKey: [
      "lead-timeline",
      leadId,
    ],

    queryFn: () =>
      leadService.getTimeline(
        leadId
      ),

    enabled: !!leadId,
  });
}