"use client";

import type {
  AxiosError,
} from "axios";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  toast,
} from "sonner";

import {
  dealService,
} from "@/services/deal.service";

export function useDeleteItem() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      dealService.deleteItem,

    onSuccess() {

      toast.success(

        "Transaction item deleted.",

      );

      queryClient.invalidateQueries({

        queryKey: [

          "deal",

        ],

      });

      queryClient.invalidateQueries({

        queryKey: [

          "deals",

        ],

      });

    },

    onError(
      error: AxiosError<{
        message: string;
      }>,
    ) {

      toast.error(

        error.response?.data.message ??
        "Failed to delete transaction item.",

      );

    },

  });

}