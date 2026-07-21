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

export function useUpdateDealStatus() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      dealService.updateStatus,

    onSuccess: (
      deal,
    ) => {

      toast.success(
        "Status Deal berhasil diperbarui.",
      );

      queryClient.invalidateQueries({
        queryKey: [
          "deal",
          deal.id,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "deals",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "timeline",
          deal.leadId,
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