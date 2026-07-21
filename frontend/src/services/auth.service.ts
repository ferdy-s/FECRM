import { LoginRequest, LoginResponse } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const authService = {
  async login(
    payload: LoginRequest
  ): Promise<LoginResponse> {

    const response = await fetch(
      `${API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },
};
