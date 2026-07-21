import { success }
from "@/lib/response";

import {
  dashboardService,
} from "@/services/dashboard.service";

import {
  requireAuth,
} from "@/middlewares/auth.middleware";

import {
  withError,
} from "@/middlewares/error.middleware";

export const GET =
  withError(
    requireAuth(
      async () => {

        const result =
          await dashboardService
            .adminDashboard();

        return success(result);
      }
    )
  );