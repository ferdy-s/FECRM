"use client";

import { useQuery }
from "@tanstack/react-query";

import {
  leadService,
} from "@/services/lead.service";

export function useLead(
  id: string
) {
  return useQuery({
    queryKey: [
      "lead",
      id,
    ],

    queryFn: () =>
      leadService.getLeadDetail(id),

    enabled: !!id,
  });
}