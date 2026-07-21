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
      async (
        req: Request
      ) => {

        const user =
          (req as any).user;

        const result =
          await dashboardService
            .salesDashboard(
              user.userId
            );

        return success(result);
      }
    )
  );