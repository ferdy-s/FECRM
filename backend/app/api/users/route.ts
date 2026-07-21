import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/services/user.service";

export async function GET(
  request: NextRequest
) {

  const { searchParams } =
    new URL(request.url);

  const role =
    searchParams.get("role");

  const isActive =
    searchParams.get("isActive");

  const search =
    searchParams.get("search");

  const users =
    await userService.list({

      role,
      isActive,
      search,

    });

  return NextResponse.json({
    success: true,
    data: users,
  });

}