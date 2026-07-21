import { success } from "@/lib/response";

import { reportService }
from "@/services/report.service";

import { withError }
from "@/middlewares/error.middleware";

import { requireAuth }
from "@/middlewares/auth.middleware";

export const GET =
  withError(
    requireAuth(
      async () => {

        const result =
          await reportService
            .collectionDashboard();

        return success(result);
      }
    )
  );