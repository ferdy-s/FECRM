import { success } from "@/lib/response";

import {
  requireAuth,
} from "@/middlewares/auth.middleware";

import {
  withError,
} from "@/middlewares/error.middleware";

import {
  priceNegotiationService,
} from "@/services/price-negotiation.service";

export const GET = withError(

  requireAuth(

    async () => {

      const history =
        await priceNegotiationService.history();

      return success(history);

    },

  ),

);