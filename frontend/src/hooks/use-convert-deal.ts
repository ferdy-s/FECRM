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

export function useConvertDeal() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      dealService.convertLead,

    onSuccess: (
      deal,
    ) => {

      toast.success(
        "Lead berhasil diubah menjadi Deal.",
      );

      queryClient.invalidateQueries({
        queryKey: [
          "leads",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "deals",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "lead",
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