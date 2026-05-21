export function withError(handler: any) {
  return async (req: Request, context: any) => {
    try {
      return await handler(req, context);
    } catch (err: any) {
      console.error("🔥 ERROR:", err); // ⬅️ WAJIB

      return Response.json(
        {
          success: false,
          message: err.message || "Internal Server Error",
        },
        { status: 500 }
      );
    }
  };
}