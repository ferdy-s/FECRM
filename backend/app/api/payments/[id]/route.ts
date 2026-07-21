import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";

import { requireAuth } from "@/middlewares/auth.middleware";

import { paymentService } from "@/services/payment.service";

export const GET = withError(
  requireAuth(
    async (
      req: Request,
      context: {
        params: Promise<{
          id: string;
        }>;
      },
    ) => {
      const { id } = await context.params;

      const payment =
        await paymentService.detail(id);

      return success(payment);
    },
  ),
);