import { paymentService } from "@/services/payment.service";

import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";
import { prisma } from "@/lib/prisma";

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

     const invoice = await prisma.invoice.findUnique({
  where: {
    id: payment.invoiceId,
  },
});

return success({
  paymentStatus: payment.status,
  invoiceStatus: invoice?.status,
});
    })
  )
);