import { leadSourceService } from "@/services/lead-source.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";

export const POST = withError(
  requireAuth(async (req: Request) => {

    const body =
      await req.json();

    const result =
      await leadSourceService.create(body);

    return success(result, 201);
  })
);

export const GET = withError(
  requireAuth(async () => {

    const result =
      await leadSourceService.list();

    return success(result);
  })
);