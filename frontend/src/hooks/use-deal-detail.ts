"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  dealService,
} from "@/services/deal.service";

export function useDealDetail(
  id: string,
) {

  return useQuery({

    queryKey: [
      "deal",
      id,
    ],

    queryFn: () =>
      dealService.detail(
        id,
      ),

    enabled:
      !!id,

  });

}