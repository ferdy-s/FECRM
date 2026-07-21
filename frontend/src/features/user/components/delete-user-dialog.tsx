"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  User,
} from "@/types/user";

import {
  useDeleteUser,
} from "@/hooks/use-delete-user";

interface DeleteUserDialogProps {

  user: User;

  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

}

export function DeleteUserDialog({

  user,

  open,

  onOpenChange,

}: DeleteUserDialogProps) {

  const mutation =
    useDeleteUser();

  function handleDelete() {

    mutation.mutate(

      user.id,

      {

        onSuccess: () => {

          onOpenChange(
            false,
          );

        },

      },

    );

  }

  return (

    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <DialogContent
        className="sm:max-w-md"
      >

        <DialogHeader>

          <DialogTitle>

            Delete User

          </DialogTitle>

          <DialogDescription>

            User ini akan dinonaktifkan
            (soft delete) dan tidak dapat
            login lagi.

          </DialogDescription>

        </DialogHeader>

        <div
          className="
            rounded-lg
            border
            bg-muted/40
            p-4
            space-y-2
          "
        >

          <div>

            <span
              className="
                text-sm
                text-muted-foreground
              "
            >

              Name

            </span>

            <p
              className="
                font-medium
              "
            >

              {user.name}

            </p>

          </div>

          <div>

            <span
              className="
                text-sm
                text-muted-foreground
              "
            >

              Email

            </span>

            <p>

              {user.email}

            </p>

          </div>

          <div>

            <span
              className="
                text-sm
                text-muted-foreground
              "
            >

              Role

            </span>

            <p>

              {user.role}

            </p>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            disabled={
              mutation.isPending
            }
            onClick={() =>
              onOpenChange(
                false,
              )
            }
          >

            Cancel

          </Button>

          <Button
            variant="destructive"
            disabled={
              mutation.isPending
            }
            onClick={
              handleDelete
            }
          >

            {mutation.isPending
              ? "Deleting..."
              : "Delete User"}

          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}