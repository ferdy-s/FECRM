"use client";

import { useState } from "react";

import {
  MoreHorizontal,
  Pencil,
  KeyRound,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "@/types/user";

import { EditUserDialog } from "./edit-user-dialog";
import { ResetPasswordDialog } from "./ResetPasswordDialog";
import { DeleteUserDialog } from "./delete-user-dialog";

interface UserActionsDropdownProps {
  user: User;
}

export function UserActionsDropdown({
  user,
}: UserActionsDropdownProps) {

  const [editOpen, setEditOpen] =
    useState(false);

  const [resetOpen, setResetOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  return (
    <>

      <DropdownMenu>

        <DropdownMenuTrigger
          asChild
        >

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >

            <MoreHorizontal className="h-4 w-4" />

          </Button>

        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56"
        >

          <DropdownMenuItem
            onClick={() =>
              setEditOpen(
                true,
              )
            }
          >

            <Pencil className="mr-2 h-4 w-4" />

            Edit User

          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              setResetOpen(
                true,
              )
            }
          >

            <KeyRound className="mr-2 h-4 w-4" />

            Regenerate Password

          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() =>
              setDeleteOpen(
                true,
              )
            }
          >

            <Trash2 className="mr-2 h-4 w-4" />

            Delete User

          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>

      <EditUserDialog
        user={user}
        open={editOpen}
        onOpenChange={
          setEditOpen
        }
      />

      <ResetPasswordDialog
        user={user}
        open={resetOpen}
        onOpenChange={
          setResetOpen
        }
      />

      <DeleteUserDialog
        user={user}
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
      />

    </>
  );
}