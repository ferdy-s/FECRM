import { dealItemService } from "@/services/deal-item.service";

import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

export const GET = withError(
  requireAuth(async (req: Request) => {
    const { searchParams } = new URL(req.url);

    const dealId = searchParams.get("dealId");

    if (!dealId) {
      throw new Error("dealId required");
    }

    const items =
      await dealItemService.list(dealId);

    return success(items);
  })
);