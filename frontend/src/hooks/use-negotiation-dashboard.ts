import {

  useQuery,

} from "@tanstack/react-query";

import {

  negotiationService,

} from "@/services/negotiation.service";

export function useNegotiationDashboard() {

  return useQuery({

    queryKey: [

      "negotiation-dashboard",

    ],

    queryFn: () =>

      negotiationService.dashboard(),

  });

}