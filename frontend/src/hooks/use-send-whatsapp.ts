"use client";

import { AxiosError } from "axios";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  communicationService,
} from "@/services/communication.service";

export function useSendWhatsapp() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      communicationService.sendWhatsapp,

    onSuccess() {

      toast.success(
        "WhatsApp berhasil dikirim."
      );

      queryClient.invalidateQueries({
        queryKey: ["lead"],
      });

      queryClient.invalidateQueries({
        queryKey: ["timeline"],
      });

    },

    onError(error: unknown) {
  const axiosError = error as AxiosError<{
    message?: string;
  }>;

  toast.error(
    axiosError.response?.data?.message ??
      "Gagal mengirim WhatsApp."
  );
}

  });

}