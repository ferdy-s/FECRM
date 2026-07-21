"use client";

import { MouseEvent, useState } from "react";
import { AlertTriangle, Bell, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { Notification } from "@/types/notification";

import NotificationTime from "./NotificationTime";

import {
  useDeleteNotification,
  useMarkRead,
} from "@/hooks/use-notifications";

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {

  const router = useRouter();

  const markRead = useMarkRead();

  const remove = useDeleteNotification();

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  function handleOpen() {

    if (!notification.isRead) {

      markRead.mutate(
        notification.id
      );

    }

    if (
      notification.title.includes(
        "Follow-up"
      )
    ) {

      router.push("/leads");

      return;

    }

    if (
      notification.title.includes(
        "Payment"
      )
    ) {

      router.push("/payments");

      return;

    }

    if (
      notification.title.includes(
        "Invoice"
      )
    ) {

      router.push("/invoices");

      return;

    }

    router.push(
      "/notifications"
    );

  }

  return (
  <>
    <div
      onClick={handleOpen}
      className={`
        group
        cursor-pointer
        rounded-2xl
        border
        p-4
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        ${
          notification.isRead
            ? "bg-card"
            : "border-primary bg-primary/5"
        }
      `}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            min-w-0
            flex-1
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              {!notification.isRead && (
                <span
                  className="
                    h-2.5
                    w-2.5
                    animate-pulse
                    rounded-full
                    bg-primary
                  "
                />
              )}

              <h4
                className={`
                  truncate
                  text-sm
                  ${
                    notification.isRead
                      ? "font-medium"
                      : "font-bold"
                  }
                `}
              >
                {notification.title}
              </h4>
            </div>

            <NotificationTime
              createdAt={
                notification.createdAt
              }
            />
          </div>

          <p
            className="
              mt-2
              line-clamp-2
              text-sm
              text-muted-foreground
            "
          >
            {notification.message}
          </p>
        </div>
      </div>

      <div
        className="
          mt-4
          flex
          justify-end
          gap-2
          border-t
          pt-3
          opacity-0
          transition-opacity
          group-hover:opacity-100
        "
      >
        {!notification.isRead && (
          <Button
            size="sm"
            variant="ghost"
            disabled={markRead.isPending}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();

              markRead.mutate(
                notification.id
              );
            }}
          >
            <Bell
              className="
                mr-2
                h-4
                w-4
              "
            />

            {markRead.isPending
              ? "Marking..."
              : "Mark as Read"}
          </Button>
        )}

        <Button
          size="sm"
          variant="ghost"
          className="text-destructive"
          disabled={remove.isPending}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();

            setDeleteOpen(true);
          }}
        >
          <Trash2
            className="
              mr-2
              h-4
              w-4
            "
          />

          Delete
        </Button>
      </div>
    </div>

        <AlertDialog
      open={deleteOpen}
      onOpenChange={setDeleteOpen}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <AlertTriangle
              className="
                h-8
                w-8
                text-destructive
              "
            />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Delete Notification
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this notification?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={remove.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={remove.isPending}
            onClick={() => {

              remove.mutate(notification.id, {
  onSuccess: () => {
    setDeleteOpen(false);
  },
});

            }}
          >
            {remove.isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
);
}