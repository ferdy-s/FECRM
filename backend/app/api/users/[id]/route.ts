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

     const { id } =
  await params;

const result =
  await userService.detail(id);

      return success(result);
    }
  )
);

export const PUT = withError(
  requireAuth(
    async (
      req: Request,
      { params }: any
    ) => {

      const { id } =
        await params;

      const body =
        await req.json();

      const result =
        await userService.update(
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
      req: Request,
      { params }: any
    ) => {

      const { id } =
  await params;

await userService.delete(id);

      return success({
        message:
          "User deleted successfully",
      });
    }
  )
);