import { reportService } from "@/services/report.service";

import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";

import { requireAuth } from "@/middlewares/auth.middleware";

export const GET = withError(
  requireAuth(async () => {

    const report =
      await reportService.sourceEffectiveness();

    return success(report);
  })
);