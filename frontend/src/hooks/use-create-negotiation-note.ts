"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  toast,
} from "sonner";

import {
  negotiationService,
} from "@/services/negotiation.service";

import type {
  CreateNegotiationNoteRequest,
} from "@/types/negotiation-note";

export function useCreateNegotiationNote() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      payload: CreateNegotiationNoteRequest,
    ) =>
      negotiationService.createNote(
        payload,
      ),

    onSuccess: (
      _,
      variables,
    ) => {

      toast.success(
        "Negotiation Note berhasil ditambahkan.",
      );

      queryClient.invalidateQueries({
        queryKey: [
          "negotiation-notes",
          variables.leadId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "lead",
          variables.leadId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "timeline",
          variables.leadId,
        ],
      });

    },

    onError: (
      error: Error,
    ) => {

      toast.error(
        error.message,
      );

    },

  });

}