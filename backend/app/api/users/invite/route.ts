import { userService } from "@/services/user.service";
import { success, error } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";

export const POST = withError(
  requireAuth(
    requireRole(["ADMIN"])(async (req: Request) => {
      const body = await req.json();

      const { name, email, role } = body;
      const user = (req as any).user;

      if (!name || !email || !role) {
        return error("name, email, role required", 400);
      }

      const result = await userService.invite({
        name,
        email,
        role,
        createdBy: user.userId,
      });

      return success(result, 201);
    })
  )
);