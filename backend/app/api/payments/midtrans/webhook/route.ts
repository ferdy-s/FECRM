import { success }
from "@/lib/response";

import { withError }
from "@/middlewares/error.middleware";

import {
  midtransWebhookService,
}
from "@/services/midtrans-webhook.service";

export const POST =
  withError(
    async (
      req: Request
    ) => {

      const payload =
        await req.json();

      const result =
        await midtransWebhookService
          .handle(
            payload
          );

      return success(
        result
      );
    }
  );