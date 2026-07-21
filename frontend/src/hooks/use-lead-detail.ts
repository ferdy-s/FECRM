"use client";

import { useQuery }
from "@tanstack/react-query";

import {
  leadService,
} from "@/services/lead.service";

export function useLeadDetail(
  id: string
) {

  return useQuery({

    queryKey: [
      "lead-detail",
      id,
    ],

    queryFn: () =>
      leadService
        .getLeadDetail(id),

    enabled: !!id,

  });

}