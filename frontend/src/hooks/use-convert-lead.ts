import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  dealService,
} from "@/services/deal.service";

export function useConvertLead() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      dealService.convertLead,

    onSuccess() {

      toast.success(
        "Lead converted successfully.",
      );

      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });

      queryClient.invalidateQueries({
        queryKey: ["deals"],
      });

    },

  });

}