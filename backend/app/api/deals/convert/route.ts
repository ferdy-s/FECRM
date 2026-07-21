import { dealService } from "@/services/deal.service";

import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";

import { requireAuth } from "@/middlewares/auth.middleware";

export const POST = withError(
  requireAuth(async (req: Request) => {

    const body = await req.json();

    const user = (req as any).user;

    const deal = await dealService.create({ leadId: body.leadId }, user);

    return success(deal, 201);
  })
);