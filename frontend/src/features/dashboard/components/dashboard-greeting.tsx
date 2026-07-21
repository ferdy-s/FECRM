"use client";

import Link from "next/link";

import {
  ChevronDown,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  dashboardActions,
} from "@/constants/dashboard-actions";

import {
  useAuth,
} from "@/hooks/use-auth";

export function DashboardGreeting() {

  const {
    user,
  } = useAuth();

  const hour =
    new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

 const actions = dashboardActions.filter(
  (action) =>
    user &&
    action.roles.includes(user.role)
);

  const primaryAction =
    actions[0];

  const groupedActions =
    actions.reduce(
      (acc, action) => {

        if (!acc[action.group]) {

          acc[action.group] = [];

        }

        acc[action.group].push(action);

        return acc;

      },
      {} as Record<
        string,
        typeof actions
      >
    );

  return (

    <div
      className="
        mb-8
        flex
        flex-col
        gap-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >

      {/* Greeting */}

      <div
        className="
          min-w-0
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >

          {greeting},{" "}

          <span
            className="
              bg-gradient-to-r
              from-primary
              to-primary/70
              bg-clip-text
              text-transparent
            "
          >

            {user?.name ?? "User"}

          </span>

          👋

        </h1>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >

          Welcome back.

          Heres whats happening across your workspace today.

        </p>

      </div>

      {/* Actions */}

      <div
        className="
          flex
          w-full
          flex-col
          gap-2
          sm:w-auto
          sm:flex-row
        "
      >

        {primaryAction && (

          <Button
            asChild
            size="default"
            className="
              min-w-[170px]
              shadow-sm
            "
          >

            <Link
              href={primaryAction.href}
            >

              <primaryAction.icon
                className="
                  mr-2
                  h-4
                  w-4
                "
              />

              {primaryAction.title}

            </Link>

          </Button>

        )}

        <DropdownMenu>

          <DropdownMenuTrigger
            asChild
          >

            <Button
              variant="outline"
              size="default"
              className="
                min-w-[140px]
              "
            >

              Quick Actions

              <ChevronDown
                className="
                  ml-2
                  h-4
                  w-4
                "
              />

            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
              w-80
            "
          >

            <DropdownMenuLabel>

              Workspace Actions

            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {Object.entries(
              groupedActions
            ).map(

              ([group, items]) => (

                <div
                  key={group}
                >

                  <DropdownMenuLabel
                    className="
                      uppercase
                      tracking-wider
                    "
                  >

                    {group}

                  </DropdownMenuLabel>

                  {items.map(
                    (action) => {

                      const Icon =
                        action.icon;

                      return (

                        <DropdownMenuItem
                          asChild
                          key={
                            action.href
                          }
                        >

                          <Link
                            href={
                              action.href
                            }
                          >

                            <Icon
                              className="
                                mr-2
                                h-4
                                w-4
                                text-primary
                              "
                            />

                            {action.title}

                          </Link>

                        </DropdownMenuItem>

                      );

                    }
                  )}

                  <DropdownMenuSeparator />

                </div>

              )

            )}

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </div>

  );

}