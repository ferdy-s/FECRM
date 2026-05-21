import { invoiceService } from "@/services/invoice.service";

import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";

export const POST = withError(
  requireAuth(
    requireRole(["ADMIN", "FINANCE"])(async (
      req: Request
    ) => {

      const body = await req.json();

      const user = (req as any).user;

      const invoice =
        await invoiceService.create(
          body.dealId,
          user
        );

      return success(invoice, 201);
    })
  )
);

export const GET = withError(
  requireAuth(async () => {

    const invoices =
      await invoiceService.list();

    return success(invoices);
  })
);