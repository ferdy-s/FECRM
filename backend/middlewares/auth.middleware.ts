import { getUserFromRequest } from "@/lib/auth";

export function requireAuth(handler: Function) {
  return async (req: Request, ctx?: any) => {
    try {
      const user = getUserFromRequest(req);

      // inject user ke request (custom)
      (req as any).user = user;

      return handler(req, ctx);
    } catch (err) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  };
}