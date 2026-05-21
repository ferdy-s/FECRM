import { leadService } from "@/services/lead.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";




// ✅ CREATE LEAD
export const POST = withError(
  requireAuth(
    requireRole(["ADMIN", "MARKETING"])(async (req: Request) => {
      const body = await req.json();
      const user = (req as any).user;
      console.log("BODY:", body);

      const lead = await leadService.create(body, user);
      return success(lead, 201);
    })
  )
);

// ✅ GET LEADS
export const GET = withError(
  requireAuth(async (req: Request) => {
    const user = (req as any).user;
    const data = await leadService.list(user);
    return success(data);
  })
);