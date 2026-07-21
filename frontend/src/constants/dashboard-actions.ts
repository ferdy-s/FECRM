import {
  Users,
  Handshake,
  FileText,
  CreditCard,
  MessageSquare,
  Package,
  Wrench,
  Database,
  BarChart3,
  ClipboardList,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

import { Role } from "./roles";

export interface DashboardAction {

  title: string;

  href: string;

  icon: LucideIcon;

  group:
    | "CRM"
    | "Finance"
    | "Catalog"
    | "Communication"
    | "Insights"
    | "Platform";

  roles: Role[];

}

export const dashboardActions: DashboardAction[] = [

  {
    title: "New Lead",
    href: "/leads",
    icon: Users,
    group: "CRM",
    roles: [
      Role.ADMIN,
      Role.MANAGER,
      Role.MARKETING,
      Role.SALES,
    ],
  },

  {
    title: "New Deal",
    href: "/deals",
    icon: Handshake,
    group: "CRM",
    roles: [
      Role.ADMIN,
      Role.MANAGER,
      Role.SALES,
    ],
  },

  {
    title: "Invoice",
    href: "/invoices",
    icon: FileText,
    group: "Finance",
    roles: [
      Role.ADMIN,
      Role.FINANCE,
    ],
  },

  {
    title: "Payment",
    href: "/payments",
    icon: CreditCard,
    group: "Finance",
    roles: [
      Role.ADMIN,
      Role.FINANCE,
    ],
  },

  {
    title: "Communication",
    href: "/communications",
    icon: MessageSquare,
    group: "Communication",
    roles: [
      Role.ADMIN,
      Role.MANAGER,
      Role.MARKETING,
      Role.SALES,
      Role.FINANCE,
    ],
  },

  {
    title: "Products",
    href: "/products",
    icon: Package,
    group: "Catalog",
    roles: [
      Role.ADMIN,
      Role.MANAGER,
    ],
  },

  {
    title: "Services",
    href: "/services",
    icon: Wrench,
    group: "Catalog",
    roles: [
      Role.ADMIN,
      Role.MANAGER,
    ],
  },

  {
    title: "Lead Sources",
    href: "/lead-sources",
    icon: Database,
    group: "Catalog",
    roles: [
      Role.ADMIN,
      Role.MANAGER,
      Role.MARKETING,
    ],
  },

  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    group: "Insights",
    roles: [
      Role.ADMIN,
      Role.MANAGER,
    ],
  },

  {
    title: "Audit Logs",
    href: "/audit-logs",
    icon: ClipboardList,
    group: "Platform",
    roles: [
      Role.ADMIN,
    ],
  },

  {
    title: "Settings",
    href: "/settings",
    icon: ShieldCheck,
    group: "Platform",
    roles: [
      Role.ADMIN,
    ],
  },

];