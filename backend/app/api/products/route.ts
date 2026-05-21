import { productService } from "@/services/product.service";

import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";
import { withError } from "@/middlewares/error.middleware";

export const POST = withError(
  requireAuth(
    requireRole(["ADMIN"])(async (req: Request) => {
      const body = await req.json();

      const product =
        await productService.create(body);

      return success(product, 201);
    })
  )
);

export const GET = withError(
  requireAuth(async () => {
    const products =
      await productService.list();

    return success(products);
  })
);