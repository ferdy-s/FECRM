import { productService } from "@/services/product.service";

import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";
import { withError } from "@/middlewares/error.middleware";

export const GET = withError(
  requireAuth(async (
    req: Request,
    context: { params: Promise<{ id: string }> }
  ) => {

    const { id } = await context.params;

    const product =
      await productService.detail(id);

    return success(product);
  })
);

export const PATCH = withError(
  requireAuth(
    requireRole(["ADMIN", "MANAGER"])(async (
      req: Request,
      context: { params: Promise<{ id: string }> }
    ) => {
      const body = await req.json();

      const { id } = await context.params;

      const product =
        await productService.update(id, body);

      return success(product);
    })
  )
);

export const DELETE = withError(
  requireAuth(
    requireRole(["ADMIN", "MANAGER"])(async (
      req: Request,
      context: { params: Promise<{ id: string }> }
    ) => {

      const { id } = await context.params;

      await productService.delete(id);

      return success({
        deleted: true,
      });
    })
  )
);