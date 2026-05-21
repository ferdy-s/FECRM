import { leadService } from "@/services/lead.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";

export const GET = withError(
  requireAuth(async (req: Request) => {
    const { searchParams } = new URL(req.url);

    const leadId = searchParams.get("leadId");

    if (!leadId) {
      throw new Error("leadId required");
    }

    const data = await leadService.timeline(leadId);
  
    return success(data);
  })
);