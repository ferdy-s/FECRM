import { negotiationService } from "@/services/negotiation.service";
import { success } from "@/lib/response";
import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

export const PATCH = withError(
  requireAuth(async (req: Request) => {
    const body = await req.json();
    const user = (req as any).user;

    const result =
      await negotiationService.start(
        body.leadId,
        user
      );

    return success(result);
  })
);