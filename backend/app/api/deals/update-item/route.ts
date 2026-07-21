import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

import { dealItemService } from "@/services/deal-item.service";

export const PATCH = withError(
  requireAuth(async (req: Request) => {

    const user = (req as any).user;

    const body = await req.json();

    const result =
      await dealItemService.updateQuantity(

        body.transactionItemId,

        body.quantity,

        user,

      );

    return success(result);

  }),
);