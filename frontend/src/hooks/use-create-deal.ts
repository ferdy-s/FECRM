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

export function useCreateDeal() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      dealService.create,

    onSuccess: () => {

      toast.success(
        "Deal berhasil dibuat.",
      );

      queryClient.invalidateQueries({
        queryKey: [
          "deals",
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

      toast.error(
        error.message,
      );

    },

  });

}