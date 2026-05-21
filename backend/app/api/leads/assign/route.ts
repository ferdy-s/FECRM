import { leadService } from "@/services/lead.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";

export const PATCH = withError(
  requireAuth(
    requireRole(["ADMIN", "MARKETING"])(async (req: Request) => {
      const { leadId, assignedTo } = await req.json();
      const user = (req as any).user;

      const result = await leadService.assign(leadId, assignedTo, user);
      return success(result);
    })
  )
);