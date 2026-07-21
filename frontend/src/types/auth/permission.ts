import { Role } from "@/constants/roles";

export interface PermissionRoute {
  path: string;
  roles: Role[];
}