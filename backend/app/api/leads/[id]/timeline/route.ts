import { leadService } from "@/services/lead.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";

export const GET = withError(
  requireAuth(async (_req: Request, { params }: any) => {
    const data = await leadService.timeline(params.id);
    return success(data);
  })
);