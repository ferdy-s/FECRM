import { communicationService } from "@/services/communication.service";
import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";

export const POST = withError(
  requireAuth(async (req: Request) => {
    const body = await req.json();
    const user = (req as any).user;

    const result = await communicationService.sendEmail(
      body,
      user
    );

    return success(result, 201);
  })
);