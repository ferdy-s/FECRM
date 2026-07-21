"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import { serviceManagement } from "@/services/service-management";

import type {
  CreateServiceDto,
  UpdateServiceDto,
} from "@/types/service";

/* ==========================================================
 * Queries
 * ========================================================== */

export function useServices() {
  return useQuery({
    queryKey: queryKeys.service.all,
    queryFn: () => serviceManagement.getAll(),
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: queryKeys.service.detail(id),
    queryFn: () => serviceManagement.getById(id),
    enabled: Boolean(id),
  });
}

/* ==========================================================
 * Mutations
 * ========================================================== */

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceDto) =>
      serviceManagement.create(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.service.all,
      });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateServiceDto;
    }) =>
      serviceManagement.update(id, data),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.service.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.service.detail(
          variables.id
        ),
      });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      serviceManagement.remove(id),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.service.all,
      });
    },
  });
}