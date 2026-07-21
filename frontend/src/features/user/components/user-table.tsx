"use client";

import { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UserActionsDropdown } from "./user-actions-dropdown";

import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { User } from "@/types/user";

import { UserRoleBadge } from "./user-role-badge";

interface UserTableProps {
  users: User[];
}

const PAGE_SIZE = 5;

export function UserTable({
  users,
}: UserTableProps) {

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        users.length /
        PAGE_SIZE,
      ),
    );

  const paginatedUsers =
    useMemo(() => {

      const start =
        (currentPage - 1) *
        PAGE_SIZE;

      return users.slice(
        start,
        start +
          PAGE_SIZE,
      );

    }, [
      users,
      currentPage,
    ]);

  const startItem =
    users.length === 0
      ? 0
      : (currentPage - 1) *
          PAGE_SIZE +
        1;

  const endItem =
    Math.min(
      currentPage *
        PAGE_SIZE,
      users.length,
    );

  const handlePrevious =
    () => {

      if (
        currentPage > 1
      ) {

        setCurrentPage(
          (prev) =>
            prev - 1,
        );

      }

    };

  const handleNext =
    () => {

      if (
        currentPage <
        totalPages
      ) {

        setCurrentPage(
          (prev) =>
            prev + 1,
        );

      }

    };

  return (

    <Card>

      <CardContent className="p-0">

        <ScrollArea className="w-full">

          <div className="min-w-[900px]">

            <Table>

              <TableHeader>

                <TableRow>

                  <TableHead className="w-[220px]">
                    Name
                  </TableHead>

                  <TableHead className="w-[260px]">
                    Email
                  </TableHead>

                  <TableHead className="w-[140px]">
                    Role
                  </TableHead>

                  <TableHead className="w-[140px]">
                    Status
                  </TableHead>

                  <TableHead className="w-[180px]">
                    Created At
                  </TableHead>

                  <TableHead className="text-right w-[140px]">
                    Actions
                  </TableHead>

                </TableRow>

              </TableHeader>

             <TableBody>

  {paginatedUsers.length === 0 ? (

    <TableRow>

      <TableCell
        colSpan={6}
        className="
          h-32
          text-center
          text-muted-foreground
        "
      >

        No users found.

      </TableCell>

    </TableRow>

  ) : (

    paginatedUsers.map(
      (user) => (

        <TableRow
          key={user.id}
          className="
            hover:bg-muted/40
            transition-colors
          "
        >

          <TableCell>

            <div className="space-y-1">

              <p className="font-medium">
                {user.name}
              </p>

              <p className="text-xs text-muted-foreground">
                ID :
                {" "}
                {user.id}
              </p>

            </div>

          </TableCell>

          <TableCell>

            <span className="break-all">

              {user.email}

            </span>

          </TableCell>

          <TableCell>

            <UserRoleBadge
              role={user.role}
            />

          </TableCell>

          <TableCell>

            {user.isActive ? (

              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-green-200
                  bg-green-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-green-700
                "
              >

                Active

              </span>

            ) : (

              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-red-200
                  bg-red-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-red-700
                "
              >

                Inactive

              </span>

            )}

          </TableCell>

          <TableCell>

            {new Date(
              user.createdAt,
            ).toLocaleDateString(
              "id-ID",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            )}

          </TableCell>

          <TableCell className="text-right">

  <UserActionsDropdown
    user={user}
  />

</TableCell>

        </TableRow>

      ),
    )

  )}

</TableBody>

            </Table>

          </div>

          <ScrollBar orientation="horizontal" />

        </ScrollArea>
<div
  className="
    flex
    flex-col
    gap-4
    border-t
    px-6
    py-4
    sm:flex-row
    sm:items-center
    sm:justify-between
  "
>

  <div
    className="
      text-sm
      text-muted-foreground
    "
  >
    Showing{" "}
    <span className="font-medium text-foreground">
      {startItem}
    </span>
    {" - "}
    <span className="font-medium text-foreground">
      {endItem}
    </span>
    {" of "}
    <span className="font-medium text-foreground">
      {users.length}
    </span>
    {" users"}
  </div>

  <div
    className="
      flex
      items-center
      gap-2
    "
  >

    <Button
      variant="outline"
      size="sm"
      onClick={handlePrevious}
      disabled={currentPage === 1}
    >
      <ChevronLeft className="mr-1 h-4 w-4" />
      Prev
    </Button>

    <div
      className="
        flex
        min-w-[72px]
        items-center
        justify-center
        rounded-md
        border
        px-3
        py-2
        text-sm
        font-medium
      "
    >
      {currentPage} / {totalPages}
    </div>

    <Button
      variant="outline"
      size="sm"
      onClick={handleNext}
      disabled={currentPage === totalPages}
    >
      Next
      <ChevronRight className="ml-1 h-4 w-4" />
    </Button>

  </div>

</div>

      </CardContent>

    </Card>

  );

}

