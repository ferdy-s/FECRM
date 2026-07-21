"use client";

import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  User,
  UserRole,
} from "@/types/user";

interface UserKPIProps {
  users: User[];
}

export function UserKPI({
  users,
}: UserKPIProps) {

  const totalUsers =
    users.length;

  const activeUsers =
    users.filter(
      (user) => user.isActive,
    ).length;

  const inactiveUsers =
    totalUsers -
    activeUsers;

  const adminUsers =
    users.filter(
      (user) =>
        user.role ===
        UserRole.ADMIN,
    ).length;

  const cards = [
    {
      title:
        "Total Users",
      value:
        totalUsers,
      subtitle:
        "Registered accounts",
      icon: Users,
    },
    {
      title:
        "Active Users",
      value:
        activeUsers,
      subtitle:
        "Currently active",
      icon: UserCheck,
    },
    {
      title:
        "Inactive Users",
      value:
        inactiveUsers,
      subtitle:
        "Disabled accounts",
      icon: UserX,
    },
    {
      title:
        "Administrators",
      value:
        adminUsers,
      subtitle:
        "System administrators",
      icon: ShieldCheck,
    },
  ];

  return (

    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      {cards.map(
        (
          card,
        ) => {

          const Icon =
            card.icon;

          return (

            <Card
              key={
                card.title
              }
              className="
                transition-all
                hover:shadow-md
              "
            >

              <CardContent
                className="
                  flex
                  items-center
                  justify-between
                  py-4
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      font-medium
                      uppercase
                      tracking-wide
                      text-muted-foreground
                    "
                  >
                    {card.title}
                  </p>

                  <h2
                    className="
                      mt-1
                      text-3xl
                      font-bold
                    "
                  >
                    {card.value}
                  </h2>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-muted-foreground
                    "
                  >
                    {card.subtitle}
                  </p>

                </div>

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                  "
                >

                  <Icon
                    className="
                      h-6
                      w-6
                      text-primary
                    "
                  />

                </div>

              </CardContent>

            </Card>

          );

        },
      )}

    </div>

  );

}