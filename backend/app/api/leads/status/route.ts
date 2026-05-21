import { leadService } from "@/services/lead.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";

export const PATCH = withError(
  requireAuth(
    requireRole(["SALES"])(async (req: Request) => {
      const { leadId, status } = await req.json();
      const user = (req as any).user;

      const result = await leadService.updateStatus(leadId, status, user);
      return success(result);
    })
  )
);