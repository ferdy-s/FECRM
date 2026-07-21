import { dealItemService } from "@/services/deal-item.service";

import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

export const POST = withError(
  requireAuth(async (req: Request) => {

    const user = (req as any).user;

    const body = await req.json();

    const result =
      await dealItemService.attachProduct(
        body,
        user,
      );

    return success(result, 201);

  }),
);