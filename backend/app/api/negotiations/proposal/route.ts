import { negotiationService } from "@/services/negotiation.service";
import { success } from "@/lib/response";
import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

export const POST = withError(
  requireAuth(async (req: Request) => {
    const body = await req.json();
    const user = (req as any).user;

    const result =
      await negotiationService.sendProposal(
        body,
        user
      );

    return success(result, 201);
  })
);