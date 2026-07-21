import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

import { priceNegotiationService }
from "@/services/price-negotiation.service";

export const PUT = withError(
  requireAuth(
    async (req: Request) => {

      const user =
        (req as any).user;

      const body =
        await req.json();

      const result =
    await priceNegotiationService.approve(
        body,
        user,
    );

      return success(result);

    },
  ),
);