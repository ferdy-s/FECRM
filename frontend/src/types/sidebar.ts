import { LucideIcon } from "lucide-react";
import { Role } from "@/constants/roles";

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: Role[];
  badge?: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}