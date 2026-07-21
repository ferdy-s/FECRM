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

interface AssignLeadRequest {

  leadId: string;

  assignedTo: string;

}

export function useAssignLead() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      payload: AssignLeadRequest,
    ) =>
      leadService.assignLead(
        payload.leadId,
        payload.assignedTo,
      ),

    onSuccess: (_, variables) => {

      toast.success(
        "Lead berhasil di-assign."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "leads",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "lead",
          variables.leadId,
        ],
      });

    },

    onError: (
      error: Error,
    ) => {

      toast.error(
        error.message ??
        "Gagal melakukan assignment."
      );

    },

  });

}