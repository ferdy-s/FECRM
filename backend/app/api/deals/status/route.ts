import { dealService } from "@/services/deal.service";
import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";

export const PATCH = withError(
  requireAuth(async (req: Request) => {
    const body = await req.json();

    const user = (req as any).user;

    const deal = await dealService.updateStatus(
      body.dealId,
      body.status,
      user
    );

    return success(deal);
  })
);