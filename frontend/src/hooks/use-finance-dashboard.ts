"use client";

import { useQuery } from "@tanstack/react-query";

import {
  dashboardService,
} from "@/services/dashboard.service";

export function useFinanceDashboard() {
  return useQuery({
    queryKey: [
      "dashboard-finance",
    ],

    queryFn: async () => {
      try {

        const result =
          await dashboardService
            .getFinanceDashboard();

        console.log(
          "FINANCE SUCCESS",
          result
        );

        return result;

      } catch (err) {

        console.error(
          "FINANCE ERROR",
          err
        );

        throw err;
      }
    },
  });
}