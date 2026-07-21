import { success } from "@/lib/response";

import { invoiceService }
from "@/services/invoice.service";

import { withError }
from "@/middlewares/error.middleware";

import { requireAuth }
from "@/middlewares/auth.middleware";

export const GET =
  withError(
    requireAuth(
      async () => {

        const result =
          await invoiceService
            .overdueInvoices();

        return success(result);
      }
    )
  );