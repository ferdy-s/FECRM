import Link from "next/link";

import {
  UserPlus,
  Briefcase,
  FileText,
  Mail,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const actions = [
  {
    title: "New Lead",
    icon: UserPlus,
    href: "/leads/create",
  },

  {
    title: "New Deal",
    icon: Briefcase,
    href: "/deals/create",
  },

  {
    title: "Create Invoice",
    icon: FileText,
    href: "/invoices/create",
  },

  {
    title: "Send Email",
    icon: Mail,
    href: "/communications/email",
  },
];

export function QuickActions() {
  return (
    <div
      className="
        grid
        gap-4
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.title}
            href={action.href}
          >
            <Card
              className="
                transition-all
                hover:shadow-md
                hover:border-primary
                cursor-pointer
              "
            >
              <CardContent
                className="
                  flex
                  items-center
                  gap-4
                  p-5
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-muted
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>

                <span
                  className="
                    font-medium
                  "
                >
                  {action.title}
                </span>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}