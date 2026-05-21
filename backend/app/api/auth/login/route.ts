import "@/lib/init";
import { authService } from "@/services/auth.service";
import { success, error } from "@/lib/response";
import { withError } from "@/middlewares/error.middleware";

export const POST = withError(async (req: Request) => {
  const body = await req.json();

  const { email, password } = body;

  if (!email || !password) {
    return error("Email & password required", 400);
  }

  const result = await authService.login(email, password);

  return success(result);
});