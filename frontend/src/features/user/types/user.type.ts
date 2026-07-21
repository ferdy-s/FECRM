export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  SALES = "SALES",
  MARKETING = "MARKETING",
  FINANCE = "FINANCE",
}

export interface User {
  id: string;

  name: string;

  email: string;

  role: UserRole;

  isActive: boolean;

  totalDeals?: number;

  totalRevenue?: number;

  createdAt?: string;
}