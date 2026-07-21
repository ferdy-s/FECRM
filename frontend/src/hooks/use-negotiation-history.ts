import {

  useQuery,

} from "@tanstack/react-query";

import {

  negotiationService,

} from "@/services/negotiation.service";

export function useNegotiationHistory() {

  return useQuery({

    queryKey: [

      "negotiation-history",

    ],

    queryFn: () =>

      negotiationService.history(),

  });

}