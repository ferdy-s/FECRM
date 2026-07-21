import { Role } from "@/constants/roles";
import { PermissionRoute } from "@/types/auth/permission";

export const permissions: PermissionRoute[] = [
  {
    path: "/users",
    roles: [Role.ADMIN],
  },

  {
    path: "/settings",
    roles: [Role.ADMIN],
  },

  {
    path: "/company",
    roles: [Role.ADMIN],
  },

  {
    path: "/payments",
    roles: [
      Role.ADMIN,
      Role.FINANCE,
      Role.MANAGER,
    ],
  },

  {
    path: "/collection",
    roles: [
      Role.ADMIN,
      Role.FINANCE,
      Role.MANAGER,
    ],
  },

  {
    path: "/report/finance",
    roles: [
      Role.ADMIN,
      Role.FINANCE,
      Role.MANAGER,
    ],
  },
];