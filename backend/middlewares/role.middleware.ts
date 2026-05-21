export function requireRole(roles: string[]) {
  return (handler: Function) => {
    return async (req: Request, ctx?: any) => {
      const user = (req as any).user;

      if (!roles.includes(user.role)) {
        return Response.json({ error: "Forbidden" }, { status: 403 });
      }

      return handler(req, ctx);
    };
  };
}