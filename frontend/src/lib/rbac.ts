import { Role } from "@/constants/roles";

export function hasRole(
  currentRole: Role,
  allowedRoles: Role[]
) {
  return allowedRoles.includes(
    currentRole
  );
}