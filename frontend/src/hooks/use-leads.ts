"use client";

import { useQuery }
from "@tanstack/react-query";

import {
  leadService,
} from "@/services/lead.service";

export function useLeads() {

  return useQuery({

    queryKey: [
      "leads",
    ],

    queryFn: () =>
      leadService.getLeads(),

  });

}