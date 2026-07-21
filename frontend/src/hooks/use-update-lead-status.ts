"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { leadService } from "@/services/lead.service";

import type {
  UpdateLeadStatusRequest,
} from "@/types/lead-status";

import type {
  LeadDetail,
} from "@/types/lead";

export function useUpdateLeadStatus() {
  const queryClient =
    useQueryClient();

  return useMutation<
    LeadDetail,
    Error,
    UpdateLeadStatusRequest
  >({
    mutationFn: (
      payload,
    ) =>
      leadService.updateLeadStatus(
        payload,
      ),

    onSuccess: (
      lead,
    ) => {

      toast.success(
        "Lead status berhasil diperbarui.",
      );

      queryClient.invalidateQueries({
        queryKey: [
          "leads",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "lead",
          lead.id,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboard",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "timeline",
          lead.id,
        ],
      });

    },

    onError: (
      error,
    ) => {

      toast.error(
        error.message ??
        "Gagal memperbarui status lead.",
      );

    },

  });
}