import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { invoiceBreakdownService } from "@/services/invoice-breakdown.service";

export const GET = withError(
  async (
    req: Request,
    context: any
  ) => {

    const params =
      await context.params;

    const result =
      await invoiceBreakdownService.detail(
        params.id
      );

    return success(result);
  }
);