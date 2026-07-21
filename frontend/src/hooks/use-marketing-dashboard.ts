"use client";

import { useQuery }
from "@tanstack/react-query";

import {
  dashboardService,
} from "@/services/dashboard.service";

export function useMarketingDashboard() {

  return useQuery({
    queryKey: [
      "dashboard-marketing",
    ],

    queryFn: () =>
      dashboardService
        .getMarketingDashboard(),
  });

}