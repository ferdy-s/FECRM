import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";

import { requireAuth } from "@/middlewares/auth.middleware";

import { notificationService } from "@/services/notification.service";

export const GET = withError(
  requireAuth(async (req: Request) => {

    const user = (req as any).user;

    const notifications =
      await notificationService.getAll(
        user.userId
      );

    return success(notifications);

  })
);