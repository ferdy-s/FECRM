import {

  useMutation,

  useQueryClient,

} from "@tanstack/react-query";

import {

  negotiationService,

} from "@/services/negotiation.service";

export function useRejectNegotiation() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      negotiationService.reject,

    onSuccess: async () => {

      await Promise.all([

        queryClient.invalidateQueries({

          queryKey: [
            "pending-negotiations",
          ],

        }),

        queryClient.invalidateQueries({

          queryKey: [
            "negotiation-dashboard",
          ],

        }),

        queryClient.invalidateQueries({

          queryKey: [
            "deals",
          ],

        }),

      ]);

    },

  });

}