"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  toast,
} from "sonner";

import {
  invoiceService,
} from "@/services/invoice.service";

export function useDownloadInvoice() {

  return useMutation({

    mutationFn:
      invoiceService.downloadPdf,

    onSuccess(
      blob,
      invoiceId,
    ) {

      const url =
        URL.createObjectURL(
          blob,
        );

      const link =
        document.createElement(
          "a",
        );

      link.href = url;

      link.download =
        `invoice-${invoiceId}.pdf`;

      link.click();

      URL.revokeObjectURL(
        url,
      );

    },

    onError(
      error: Error,
    ) {

      toast.error(
        error.message,
      );

    },

  });

}