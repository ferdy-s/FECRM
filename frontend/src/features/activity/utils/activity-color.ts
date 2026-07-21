import type { ActivityType } from "@/types/activity";

export function getActivityBadgeClass(
  type: ActivityType
) {
  switch (type) {
    case "CALL":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";

    case "EMAIL":
      return "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300";

    case "NEGOTIATION":
      return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300";

    case "FINANCE":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";

    case "MEETING":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";

    case "ASSIGNMENT":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";

    case "STATUS":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";

    case "NOTE":
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";

    case "SYSTEM":
      return "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

    default:
      return "bg-primary/10 text-primary";
  }
}