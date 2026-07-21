"use client";

import { useRouter } from "next/navigation";

import {
  Bell,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/hooks/use-auth";
import { useNotifications } from "@/hooks/use-notifications";

import {
  NotificationDropdown,
} from "@/features/notification";

export function AppHeader() {
  const router = useRouter();

  const {
    user,
    logout,
  } = useAuth();

  const {
    data: notifications = [],
    isLoading,
  } = useNotifications();

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "U";

  function handleLogout() {
    logout();

    router.replace("/login");
  }

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-16
        items-center
        justify-between
        border-b
        bg-background/95
        px-3
        backdrop-blur
        supports-[backdrop-filter]:bg-background/70
        sm:px-4
        lg:px-6
      "
    >
      {/* LEFT */}

      <div
        className="
          flex
          min-w-0
          flex-1
          items-center
          gap-3
        "
      >
        <SidebarTrigger
          className="md:hidden"
        />

        <div
          className="
            hidden
            w-full
            max-w-md
            lg:block
          "
        >
          <Input
            placeholder="Search leads, deals, invoices..."
            className="w-full"
          />
        </div>
      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-1
          sm:gap-2
          lg:gap-4
        "
      >
        {/* ===================================================== */}
        {/* Notification */}
        {/* ===================================================== */}

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
          >
            <Button
              size="icon"
              variant="ghost"
              className="
                relative
                h-9
                w-9
              "
            >
              <Bell
                className="
                  h-5
                  w-5
                "
              />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-destructive
                    px-1
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
              w-[420px]
              p-0
            "
          >
            <NotificationDropdown
              notifications={
                notifications
              }
              isLoading={
                isLoading
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ===================================================== */}
        {/* Theme */}
        {/* ===================================================== */}

        <ThemeToggle />

        {/* ===================================================== */}
        {/* User */}
        {/* ===================================================== */}

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
          >
            <Button
              variant="ghost"
              className="
                h-auto
                gap-2
                px-1
                sm:px-2
              "
            >
              <Avatar
                className="
                  h-9
                  w-9
                "
              >
                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div
                className="
                  hidden
                  text-left
                  lg:block
                "
              >
                <p
                  className="
                    text-sm
                    font-semibold
                    leading-none
                  "
                >
                  {user?.name ??
                    "Guest"}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-muted-foreground
                  "
                >
                  {user?.role ??
                    "No Role"}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
          >
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}