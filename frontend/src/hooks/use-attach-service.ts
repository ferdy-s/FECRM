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

export function useAttachService() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      dealService.attachService,

    onSuccess: (
      _,
      variables,
    ) => {

      toast.success(
        "Service berhasil ditambahkan.",
      );

      queryClient.invalidateQueries({
        queryKey: [
          "deal",
          variables.dealId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "deals",
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