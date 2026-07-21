import { success }
from "@/lib/response";

import {
  dashboardService,
} from "@/services/dashboard.service";

import {
  requireAuth,
} from "@/middlewares/auth.middleware";

import {
  requireRole,
} from "@/middlewares/role.middleware";

import {
  withError,
} from "@/middlewares/error.middleware";

export const GET =
  withError(
    requireAuth(
      requireRole([
        "MARKETING",
        "ADMIN",
      ])(
        async () => {

          const result =
            await dashboardService
              .marketingDashboard();

          return success(result);
        }
      )
    )
  );