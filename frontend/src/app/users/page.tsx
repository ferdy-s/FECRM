"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { UserKPI } from "@/features/user/components/user-kpi";
import { UserTable } from "@/features/user/components/user-table";

import { useUsers } from "@/hooks/use-users";

export default function UsersPage() {

  const {
    data: users = [],
    isPending,
    isError,
  } = useUsers();

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-muted-foreground">
            Workforce & Permission Management
          </p>

        </div>

        {isPending && (
          <p className="text-muted-foreground">
            Loading users...
          </p>
        )}

        {isError && (
          <p className="text-destructive">
            Failed to load users.
          </p>
        )}

        {!isPending && !isError && (
          <>
            <UserKPI
              users={users}
            />

            <UserTable
              users={users}
            />
          </>
        )}

      </div>

    </DashboardLayout>
  );
}