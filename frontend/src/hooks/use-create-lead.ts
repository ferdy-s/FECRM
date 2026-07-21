"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";


import { toast } from "sonner";

import {
  leadService,
} from "@/services/lead.service";

import type {
  CreateLeadRequest,
} from "@/types/create-lead";

export function useCreateLead() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      payload: CreateLeadRequest,
    ) =>
      leadService.createLead(
        payload,
      ),

    onSuccess: () => {

      toast.success(
        "Lead berhasil dibuat."
      );

      queryClient.invalidateQueries({
        queryKey: [
          "leads",
        ],
      });

    },

    onError: (
      error: Error,
    ) => {

      toast.error(
        error.message ??
        "Gagal membuat lead."
      );

    },

  });

}