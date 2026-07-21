import {
  useQuery,
} from "@tanstack/react-query";

import {
  dealService,
} from "@/services/deal.service";

export function useDeals() {

  return useQuery({

    queryKey: [
      "deals",
    ],

    queryFn:
      dealService.getDeals,

  });

}