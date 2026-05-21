import { dealItemService } from "@/services/deal-item.service";

import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

export const POST = withError(
  requireAuth(async (req: Request) => {
    const body = await req.json();

    const item =
      await dealItemService.attachProduct(body);

    return success(item, 201);
  })
);