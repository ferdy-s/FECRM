export enum UserRole {
  MARKETING = "MARKETING",
  SALES = "SALES",
  ADMIN = "ADMIN",
  FINANCE = "FINANCE",
  MANAGER = "MANAGER",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  deletedAt: string | null;
}

export interface UserResponse {
  success: boolean;
  data: User[];
}

export interface ResetPasswordResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    temporaryPassword: string;
  };
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface ResetPasswordResult {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  temporaryPassword: string;
}