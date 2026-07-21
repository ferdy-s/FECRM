"use client";

import { useQuery } from "@tanstack/react-query";

import { collectionService }
from "../services/collection.service";

export function useCollections() {
  return useQuery({
    queryKey: ["collection-worklist"],

    queryFn: () =>
      collectionService.getWorklist(),

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
}