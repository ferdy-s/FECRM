import {
  Activity,
  CalendarDays,
  Handshake,
  Mail,
  MessageCircle,
 MonitorCog,
  Phone,
  StickyNote,
  UserCheck,
  Wallet,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { ActivityType } from "@/types/activity";

export function getActivityIcon(
  type: ActivityType
): LucideIcon {
  switch (type) {
    case "SYSTEM":
      return MonitorCog;

    case "NOTE":
      return StickyNote;

    case "STATUS":
      return Activity;

    case "ASSIGNMENT":
      return UserCheck;

    case "COMMUNICATION":
      return MessageCircle;

    case "NEGOTIATION":
      return Handshake;

    case "FINANCE":
      return Wallet;

    case "CALL":
      return Phone;

    case "MEETING":
      return CalendarDays;

    case "EMAIL":
      return Mail;

    default:
      return Activity;
  }
}