import { success } from "@/lib/response";
import { invoiceService } from "@/services/invoice.service";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";

export const GET = withError(
  requireAuth(async (req: Request) => {

    const pathname =
      new URL(req.url).pathname;

    const invoiceId =
      pathname.split("/")[3];

    const result =
      await invoiceService.getProgress(
        invoiceId
      );

    return success(result);
  })
);