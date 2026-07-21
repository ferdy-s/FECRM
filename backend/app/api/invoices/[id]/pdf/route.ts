export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import {
  invoicePdfService,
} from "@/services/invoice-pdf.service";

import {
  withError,
} from "@/middlewares/error.middleware";

export const GET =
  withError(
    async (
      req: Request,
      context: any
    ) => {

      const params =
        await context.params;

      const pdf =
        await invoicePdfService.generate(
          params.id
        );

      return new Response(
        new Uint8Array(pdf),
        {
          headers: {

            "Content-Type":
              "application/pdf",

            "Content-Disposition":
              `inline; filename=invoice-${params.id}.pdf`,
          },
        }
      );
    }
  );