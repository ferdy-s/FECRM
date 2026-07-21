import { success }
from "@/lib/response";

import { qrisService }
from "@/services/qris.service";

import { withError }
from "@/middlewares/error.middleware";

import { requireAuth }
from "@/middlewares/auth.middleware";

import { requireRole }
from "@/middlewares/role.middleware";

export const POST =
  withError(
    requireAuth(
      requireRole([
        "FINANCE"
      ])(
        async (
          req: Request
        ) => {

          const body =
            await req.json();

          const result =
            await qrisService
              .generate(
                body.invoiceId
              );

          return success(
            result
          );
        }
      )
    )
  );