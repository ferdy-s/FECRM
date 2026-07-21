import { Role }
from "@/constants/roles";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;

  data: {
    token: string;
    user: AuthUser;
  };
}