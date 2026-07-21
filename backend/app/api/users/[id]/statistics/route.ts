import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { userService } from "@/services/user.service";

export const GET = withError(
  requireAuth(
    async (
      req: Request,
      { params }: any
    ) => {

      const result =
        await userService.statistics(
          params.id
        );

      return success(result);
    }
  )
);