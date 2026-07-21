import {

  useQuery,

} from "@tanstack/react-query";

import {

  negotiationService,

} from "@/services/negotiation.service";

export function usePendingNegotiations() {

  return useQuery({

    queryKey: [

      "pending-negotiations",

    ],

    queryFn: () =>

      negotiationService.pending(),

  });

}