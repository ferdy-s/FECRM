"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

export interface LeadSource {
  id: string;
  name: string;
}

export function useLeadSources() {
  return useQuery({

    queryKey: [
      "lead-sources",
    ],

    queryFn: async () => {

      const response =
        await api.get(
          "/lead-sources"
        );

      return response.data.data as LeadSource[];

    },

    staleTime: 1000 * 60 * 30,

  });
}