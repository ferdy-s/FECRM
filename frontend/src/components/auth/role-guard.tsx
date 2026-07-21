"use client";

import type { ReactNode } from "react";

import { Role } from "@/constants/roles";

interface Props {
  role: Role | null;
  allow: Role[];
  children: ReactNode;
}

export function RoleGuard({
  role,
  allow,
  children,
}: Props) {

  if (!role) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">

          <h1 className="text-3xl font-bold">
            401
          </h1>

          <p className="text-muted-foreground">
            Unauthorized
          </p>

        </div>
      </div>
    );
  }

  const allowed =
    allow.includes(role);

  if (!allowed) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">

          <h1 className="text-3xl font-bold">
            403
          </h1>

          <p className="text-muted-foreground">
            Access Denied
          </p>

        </div>
      </div>
    );
  }

  return <>{children}</>;
}