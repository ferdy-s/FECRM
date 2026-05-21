import { negotiationService } from "@/services/negotiation.service";
import { success } from "@/lib/response";
import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

export const GET = withError(
  requireAuth(async (req: Request) => {
    const { searchParams } = new URL(req.url);

    const leadId = searchParams.get("leadId");

    if (!leadId) {
      throw new Error("leadId required");
    }

    const result =
      await negotiationService.notes(
        leadId
      );

    return success(result);
  })
);