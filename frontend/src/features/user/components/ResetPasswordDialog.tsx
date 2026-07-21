"use client";

import { useState } from "react";

import { Copy, KeyRound, Loader2 } from "lucide-react";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { useResetPassword } from "@/hooks/use-users";

import type { User } from "@/types/user";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  user,
}: ResetPasswordDialogProps) {
  const mutation = useResetPassword();

  const [password, setPassword] =
    useState("");

  if (!user) {
    return null;
  }

  const {
    id,
    name,
    email,
  } = user;

  async function handleReset() {
    try {
      const result =
        await mutation.mutateAsync(id);

      setPassword(
        result.temporaryPassword,
      );

      toast.success(
        "Password has been reset successfully.",
      );
    } catch {
      toast.error(
        "Failed to reset password.",
      );
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(
      password,
    );

    toast.success(
      "Password copied to clipboard.",
    );
  }

  function handleClose() {
    setPassword("");

    onOpenChange(false);
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={handleClose}
    >
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Reset Password
          </AlertDialogTitle>

          <AlertDialogDescription>
            The users current password will
            become invalid immediately after
            generating a new password.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Separator />

        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Name
            </p>

            <p className="font-medium">
              {name}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <p className="font-medium">
              {email}
            </p>
          </div>
        </div>

        {password && (
          <>
            <Separator />

            <Card>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Temporary Password
                  </p>

                  <p
                    className="
                      mt-2
                      rounded-md
                      border
                      bg-muted
                      p-3
                      font-mono
                      text-lg
                      break-all
                    "
                  >
                    {password}
                  </p>
                </div>

                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={handleCopy}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Password
                </Button>

                <p className="text-xs text-muted-foreground">
                  This password is displayed only once.
                  Please copy and store it before
                  closing this dialog.
                </p>
              </CardContent>
            </Card>
          </>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>
            Close
          </AlertDialogCancel>

          {!password && (
            <AlertDialogAction
              onClick={handleReset}
              disabled={mutation.isPending}
            >
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              Generate Password
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}