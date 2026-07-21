import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";
import { paymentService } from "@/services/payment.service";

export const PUT = withError(
  requireAuth(
    requireRole(["FINANCE"])(
      async (
        req: Request,
        context: any
      ) => {

        const params =
          await context.params;

        const body =
          await req.json();

        const user =
          (req as any).user;

        const result =
          await paymentService.reject(
            params.id,
            body.reason,
            user
          );

        return success(result);
      }
    )
  )
);