import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { leadSourceService } from "@/services/lead-source.service";

import type {
  CreateLeadSourceDto,
  UpdateLeadSourceDto,
} from "@/types/lead-source";

const QUERY_KEY = ["lead-sources"];

export function useLeadSources() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () =>
      leadSourceService.getLeadSources(),
  });
}

export function useLeadSource(
  id: string
) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],

    queryFn: () =>
      leadSourceService.getLeadSource(id),

    enabled: !!id,
  });
}

export function useCreateLeadSource() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateLeadSourceDto
    ) =>
      leadSourceService.createLeadSource(
        payload
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      toast.success(
        "Lead source created successfully."
      );
    },

    onError: (
      error: Error
    ) => {
      toast.error(
        error.message
      );
    },
  });
}

export function useUpdateLeadSource() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateLeadSourceDto;
    }) =>
      leadSourceService.updateLeadSource(
        id,
        payload
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: [
          ...QUERY_KEY,
          variables.id,
        ],
      });

      toast.success(
        "Lead source updated successfully."
      );
    },

    onError: (
      error: Error
    ) => {
      toast.error(
        error.message
      );
    },
  });
}

export function useDeleteLeadSource() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string
    ) =>
      leadSourceService.deleteLeadSource(
        id
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      toast.success(
        "Lead source deleted successfully."
      );
    },

    onError: (
      error: Error
    ) => {
      toast.error(
        error.message
      );
    },
  });
}