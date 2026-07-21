import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { reportService } from "@/services/report.service";

import { queryKeys } from "@/lib/query-keys";

export function useFinanceKPI() {
  return useQuery({
    queryKey: queryKeys.report.financeKPI,
    queryFn: reportService.getFinanceKPI,
  });
}

export function useCollectionDashboard() {
  return useQuery({
    queryKey: queryKeys.report.collectionDashboard,
    queryFn:
      reportService.getCollectionDashboard,
  });
}

export function useCollectionReport() {
  return useQuery({
    queryKey: queryKeys.report.collectionReport,
    queryFn:
      reportService.getCollectionReport,
  });
}

export function useAging() {
  return useQuery({
    queryKey: queryKeys.report.aging,
    queryFn: reportService.getAging,
  });
}

export function usePipeline() {
  return useQuery({
    queryKey: queryKeys.report.pipeline,
    queryFn: reportService.getPipeline,
  });
}

export function useSalesPerformance() {
  return useQuery({
    queryKey: queryKeys.report.sales,
    queryFn:
      reportService.getSalesPerformance,
  });
}

export function useSourcePerformance() {
  return useQuery({
    queryKey: queryKeys.report.sources,
    queryFn:
      reportService.getSourcePerformance,
  });
}

export function useRefreshOverdue() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      reportService.refreshOverdue,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.report.collectionDashboard,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.report.collectionReport,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.report.aging,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.report.financeKPI,
      });
    },
  });
}