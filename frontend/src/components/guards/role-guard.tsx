"use client";

import { ReactNode }
from "react";

import { Role }
from "@/constants/roles";

interface Props {

  role: Role;

  allowed: Role[];

  children: ReactNode;
}

export function RoleGuard({
  role,
  allowed,
  children,
}: Props) {

  if (
    !allowed.includes(
      role
    )
  ) {

    return (
      <div
        className="
          flex
          items-center
          justify-center
          h-[400px]
        "
      >
        Access Denied
      </div>
    );
  }

  return <>{children}</>;
}