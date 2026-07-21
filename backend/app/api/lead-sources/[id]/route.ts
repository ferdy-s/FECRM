import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";
import { success } from "@/lib/response";
import { leadSourceService } from "@/services/lead-source.service";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export const GET = withError(
  requireAuth(
    async (
      _req: Request,
      { params }: RouteContext
    ) => {
      const { id } = await params;

      const result =
        await leadSourceService.detail(id);

      return success(result);
    }
  )
);

export const PUT = withError(
  requireAuth(
    async (
      req: Request,
      { params }: RouteContext
    ) => {
      const { id } = await params;

      const body =
        await req.json();

      const result =
        await leadSourceService.update(
          id,
          body
        );

      return success(result);
    }
  )
);

export const DELETE = withError(
  requireAuth(
    async (
      _req: Request,
      { params }: RouteContext
    ) => {
      const { id } = await params;

      await leadSourceService.delete(id);

      return success(
        null,
        200,
      );
    }
  )
);