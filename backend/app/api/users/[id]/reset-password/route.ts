import { success } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { userService } from "@/services/user.service";

export const POST = withError(
  requireAuth(
    async (
      req: Request,
      { params }: any
    ) => {

      const { id } =
        await params;

      const result =
        await userService.resetPassword(
          id
        );

      return success(result);

    }
  )
);