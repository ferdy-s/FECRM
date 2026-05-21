import { communicationService } from "@/services/communication.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";

export const GET = withError(
  requireAuth(async (req: Request) => {
    const { searchParams } = new URL(req.url);

    const leadId = searchParams.get("leadId");

    if (!leadId) {
      throw new Error("leadId is required");
    }

    const data = await communicationService.history(
      leadId
    );

    return success(data);
  })
);