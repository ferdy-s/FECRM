import { dealService } from "@/services/deal.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";

export const GET = withError(
  requireAuth(async () => {
    const deals =
      await dealService.listInvoiceable();

    return success(deals);
  }),
);