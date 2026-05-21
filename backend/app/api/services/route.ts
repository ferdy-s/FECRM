import { serviceService } from "@/services/service.service";

import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";
import { withError } from "@/middlewares/error.middleware";

export const POST = withError(
  requireAuth(
    requireRole(["ADMIN"])(async (req: Request) => {
      const body = await req.json();

      const service =
        await serviceService.create(body);

      return success(service, 201);
    })
  )
);

export const GET = withError(
  requireAuth(async () => {
    const services =
      await serviceService.list();

    return success(services);
  })
);