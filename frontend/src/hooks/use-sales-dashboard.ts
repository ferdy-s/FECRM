"use client";

import { useQuery }
from "@tanstack/react-query";

import {
  dashboardService,
} from "@/services/dashboard.service";

export function useSalesDashboard() {

  return useQuery({
    queryKey: [
      "dashboard-sales",
    ],

    queryFn: () =>
      dashboardService
        .getSalesDashboard(),
  });

}