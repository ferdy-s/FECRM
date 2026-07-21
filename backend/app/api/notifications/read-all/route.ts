import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";

import { requireAuth } from "@/middlewares/auth.middleware";

import { notificationService } from "@/services/notification.service";

export const PATCH = withError(
  requireAuth(async (req: Request) => {

    const user = (req as any).user;

    await notificationService.markAllRead(
      user.userId
    );

    return success(null);

  })
);