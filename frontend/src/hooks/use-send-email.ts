"use client";

import {

  useMutation,

  useQueryClient,

} from "@tanstack/react-query";

import {

  toast,

} from "sonner";

import {

  communicationService,

} from "@/services/communication.service";

import type {

  SendEmailRequest,

} from "@/types/send-email";

export function useSendEmail() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      payload: SendEmailRequest,
    ) =>
      communicationService.sendEmail(
        payload,
      ),

    onSuccess: (
      _,
      variables,
    ) => {

      toast.success(
        "Email berhasil dikirim.",
      );

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

      queryClient.invalidateQueries({
        queryKey: [
          "dashboard",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "communications",
          variables.leadId,
        ],
      });

    },

    onError: (
      error: Error,
    ) => {

      toast.error(
        error.message ??
        "Gagal mengirim email.",
      );

    },

  });

}