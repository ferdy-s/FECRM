import { paymentService } from "@/services/payment.service";

import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";

export const POST = withError(
  requireAuth(
    requireRole(["ADMIN", "SALES", "MARKETING"])(async (
      req: Request
    ) => {

      const body = await req.json();

      const user = (req as any).user;

      const payment =
        await paymentService.upload(
          body,
          user
        );

      return success(payment, 201);
    })
  )
);

export const GET = withError(
  requireAuth(async () => {

    const payments =
      await paymentService.list();

    return success(payments);
  })
);