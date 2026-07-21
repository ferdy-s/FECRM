import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";

import { requireAuth } from "@/middlewares/auth.middleware";

import { notificationService } from "@/services/notification.service";

export const DELETE = withError(
  requireAuth(async (req: Request, ctx: any) => {

    const user = (req as any).user;

    await notificationService.remove(
      ctx.params.id,
      user.userId
    );

    return success(null);

  })
);