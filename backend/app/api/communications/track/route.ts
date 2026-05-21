import { communicationService } from "@/services/communication.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";

export const PATCH = withError(
  requireAuth(async (req: Request) => {
    const body = await req.json();

    const result = await communicationService.track(body);

    return success(result);
  })
);