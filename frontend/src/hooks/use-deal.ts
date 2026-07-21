import {
  useQuery,
} from "@tanstack/react-query";

import {
  dealService,
} from "@/services/deal.service";

export function useDeal(
  dealId: string,
) {

  return useQuery({

    queryKey: [
      "deal",
      dealId,
    ],

    enabled:
      !!dealId,

    queryFn: () =>
      dealService.getDeal(
        dealId,
      ),

  });

}