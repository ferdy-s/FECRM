import { paymentService } from "@/services/payment.service";

import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";

export const PATCH = withError(
  requireAuth(
    requireRole(["FINANCE"])(async (
      req: Request
    ) => {

      const body = await req.json();

      const user = (req as any).user;

      const payment =
        await paymentService.verify(
          body.paymentId,
          body.status,
          user
        );

      return success({
        paymentStatus: payment.status,
        invoiceStatus:
          body.status === "VERIFIED"
            ? "PAID"
            : "PENDING",
      });
    })
  )
);