import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";

import { leadService } from "@/services/lead.service";

//////////////////////////////////////////////////////////////
// GET DETAIL
//////////////////////////////////////////////////////////////

export const GET = withError(
  requireAuth(
    async (
      _req: Request,
      { params }: any,
    ) => {

      const { id } =
        await params;

      const result =
        await leadService.detail(id);

      return success(result);

    },
  ),
);

//////////////////////////////////////////////////////////////
// UPDATE LEAD
//////////////////////////////////////////////////////////////

export const PATCH = withError(
  requireAuth(
    requireRole([
      "SALES",
      "MARKETING",
      "MANAGER",
    ])(
      async (
        req: Request,
        { params }: any,
      ) => {

        console.log("===== PATCH LEAD =====");

        const body = await req.json();

        console.log("BODY:", body);

        const user = (req as any).user;

        console.log("USER:", user);

        const { id } = await params;

        console.log("PARAM:", id);

        const result =
          await leadService.update(
            id,
            body,
            user,
          );

        console.log("SUCCESS");

        return success(result);

      },
    ),
  ),
);