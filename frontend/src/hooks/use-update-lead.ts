"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  toast,
} from "sonner";

import {
  leadService,
} from "@/services/lead.service";

import type {
  LeadDetail,
} from "@/types/lead";

import type {
  UpdateLeadRequest,
} from "@/types/update-lead";

export function useUpdateLead() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: async (
      payload: UpdateLeadRequest,
    ): Promise<LeadDetail> => {

      console.log(
        "===== UPDATE PAYLOAD =====",
      );

      console.log(payload);

      return await leadService.updateLead(
        payload,
      );

    },

    onSuccess: (
      lead,
    ) => {

      console.log(
        "===== UPDATE RESULT =====",
      );

      console.log(lead);

      toast.success(
        "Lead berhasil diperbarui.",
      );

      ////////////////////////////////////////////////////
      // UPDATE CACHE
      ////////////////////////////////////////////////////

      queryClient.setQueryData(
        [
          "lead",
          lead.id,
        ],
        lead,
      );

      ////////////////////////////////////////////////////
      // REFETCH
      ////////////////////////////////////////////////////

      queryClient.invalidateQueries({
        queryKey: [
          "lead",
          lead.id,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "leads",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "timeline",
          lead.id,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboard",
        ],
      });

    },

    onError: (
      error: Error,
    ) => {

      console.error(
        "UPDATE ERROR",
        error,
      );

      toast.error(
        error.message ||
        "Gagal memperbarui Lead.",
      );

    },

  });

}