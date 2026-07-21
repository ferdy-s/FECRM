import { Role } from "@/constants/roles";
import { permissions } from "./permissions";

export function usePermission(
  role: Role
) {
  return {
    role,
    ...permissions,
  };
}