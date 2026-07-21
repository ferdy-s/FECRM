import { success }
from "@/lib/response";

import { withError }
from "@/middlewares/error.middleware";

import { requireAuth }
from "@/middlewares/auth.middleware";

import { collectionService }
from "@/services/collection.service";

export const POST =
  withError(
    requireAuth(
      async () => {

        const result =
          await collectionService
            .markOverdueInvoices();

        return success(result);

      }
    )
  );