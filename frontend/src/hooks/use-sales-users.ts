"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  userService,
} from "@/services/user.service";

export function useSalesUsers() {

  return useQuery({

    queryKey: [
      "sales-users",
    ],

    queryFn: () =>
      userService.getSalesUsers(),

    staleTime:
      1000 * 60 * 5,

  });

}