import {
  LayoutDashboard,
  Users,
  Bell,
  Briefcase,
  Handshake,
  FileText,
  CreditCard,
  Wallet,
  BarChart3,
  MessageSquare,
  Activity,
  Package,
  Wrench,
  ShieldCheck,
  Database,
  ClipboardList,
} from "lucide-react";

import { Role } from "./roles";
import { SidebarSection } from "@/types/sidebar";

export const sidebarSections: SidebarSection[] = [
  {
    title: "WORKSPACE",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
          Role.MARKETING,
          Role.SALES,
          Role.FINANCE,
        ],
      },
      {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
          Role.MARKETING,
          Role.SALES,
          Role.FINANCE,
        ],
      },
    ],
  },

  {
    title: "CUSTOMER ENGAGEMENT",
    items: [
      {
        title: "Leads",
        href: "/leads",
        icon: Users,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
          Role.MARKETING,
          Role.SALES,
        ],
      },

      {
        title: "Activities",
        href: "/activity",
        icon: Activity,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
          Role.MARKETING,
          Role.SALES,
          Role.FINANCE,
        ],
      },

      {
        title: "Communication Logs",
        href: "/communications",
        icon: MessageSquare,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
          Role.MARKETING,
          Role.SALES,
          Role.FINANCE,
        ],
      },
    ],
  },

  {
    title: "COMMERCIAL",
    items: [
      {
        title: "Deals",
        href: "/deals",
        icon: Handshake,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
          Role.SALES,
        ],
      },

      {
        title: "Negotiations",
        href: "/negotiations",
        icon: Briefcase,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
        ],
      },
    ],
  },

  {
    title: "CATALOG",
    items: [
      {
        title: "Products",
        href: "/products",
        icon: Package,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
        ],
      },

      {
        title: "Services",
        href: "/services",
        icon: Wrench,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
        ],
      },

      {
        title: "Lead Sources",
        href: "/lead-sources",
        icon: Database,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
          Role.MARKETING,
        ],
      },
    ],
  },

  {
    title: "BILLING",
    items: [
      {
        title: "Invoices",
        href: "/invoices",
        icon: FileText,
        roles: [
          Role.ADMIN,
          Role.FINANCE,
        ],
      },

      {
        title: "Payments",
        href: "/payments",
        icon: CreditCard,
        roles: [
          Role.ADMIN,
          Role.FINANCE,
        ],
      },

      {
        title: "Collections",
        href: "/collection",
        icon: Wallet,
        roles: [
          Role.ADMIN,
          Role.FINANCE,
        ],
      },
    ],
  },

  {
    title: "INSIGHTS",
    items: [
      {
        title: "Report",
        href: "/reports",
        icon: BarChart3,
        roles: [
          Role.ADMIN,
          Role.MANAGER,
        ],
      },
    ],
  },

  {
    title: "PLATFORM",
    items: [
      {
        title: "Users",
        href: "/users",
        icon: Users,
        roles: [
          Role.ADMIN,
        ],
      },

      {
        title: "Audit Logs",
        href: "/audit-logs",
        icon: ClipboardList,
        roles: [
          Role.ADMIN,
        ],
      },
    ],
  },
];