import { dealService } from "@/services/deal.service";
import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";

// CREATE DEAL
export const POST = withError(
  requireAuth(
    requireRole(["ADMIN", "SALES"])(async (req: Request) => {

      const body = await req.json();

      const user = (req as any).user;

      const deal = await dealService.create(
        body,
        user
      );

      return success(deal, 201);
    })
  )
);

// GET DEALS
export const GET = withError(
  requireAuth(async () => {

    const deals = await dealService.list();

    return success(deals);
  })
);