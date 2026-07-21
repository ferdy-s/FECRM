import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

import { priceNegotiationService } from "@/services/price-negotiation.service";

export const POST = withError(
  requireAuth(async (req: Request) => {

    const user = (req as any).user;

    const body = await req.json();

    const result =
      await priceNegotiationService.reject(
        body,      // <-- kirim object, bukan body.negotiationId
        user,
      );

    return success(result);

  }),
);