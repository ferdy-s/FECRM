import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

import { dealItemService } from "@/services/deal-item.service";

export const DELETE = withError(
  requireAuth(
    async (
      req: Request,
      context: {
        params: Promise<{
          id: string;
        }>;
      },
    ) => {

      const user =
        (req as any).user;

      const { id } =
        await context.params;

      const result =
        await dealItemService.remove(
          id,
          user,
        );

      return success(result);

    },
  ),
);