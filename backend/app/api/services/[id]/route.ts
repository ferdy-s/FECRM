import { serviceService } from "@/services/service.service";

import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";
import { withError } from "@/middlewares/error.middleware";

export const GET = withError(
  requireAuth(async (
    req: Request,
    { params }: any
  ) => {
    const service =
      await serviceService.detail(params.id);

    return success(service);
  })
);

export const PATCH = withError(
  requireAuth(
    requireRole(["ADMIN"])(async (
      req: Request,
      { params }: any
    ) => {
      const body = await req.json();

      const service =
        await serviceService.update(
          params.id,
          body
        );

      return success(service);
    })
  )
);

export const DELETE = withError(
  requireAuth(
    requireRole(["ADMIN"])(async (
      req: Request,
      { params }: any
    ) => {
      await serviceService.delete(params.id);

      return success({
        deleted: true,
      });
    })
  )
);