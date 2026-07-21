import { Notification } from "@/types/notification";

/* ==========================================================
 * Notification Groups
 * ========================================================== */

export type NotificationGroup =
  | "Today"
  | "Yesterday"
  | "This Week"
  | "Older";

/* ==========================================================
 * Start Of Day
 * ========================================================== */

function startOfDay(date: Date) {
  const d = new Date(date);

  d.setHours(
    0,
    0,
    0,
    0
  );

  return d;
}

/* ==========================================================
 * Get Notification Group
 * ========================================================== */

export function getNotificationGroup(
  createdAt: string | Date
): NotificationGroup {

  const date =
    new Date(createdAt);

  const today =
    startOfDay(new Date());

  const yesterday =
    new Date(today);

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const thisWeek =
    new Date(today);

  thisWeek.setDate(
    thisWeek.getDate() - 7
  );

  if (date >= today) {
    return "Today";
  }

  if (date >= yesterday) {
    return "Yesterday";
  }

  if (date >= thisWeek) {
    return "This Week";
  }

  return "Older";

}

/* ==========================================================
 * Relative Time
 * ========================================================== */

export function formatRelativeTime(
  createdAt: string | Date
) {

  const date =
    new Date(createdAt);

  const seconds =
    Math.floor(
      (Date.now() - date.getTime()) /
      1000
    );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes =
    Math.floor(seconds / 60);

  if (minutes < 60) {

    return `${minutes}m ago`;

  }

  const hours =
    Math.floor(minutes / 60);

  if (hours < 24) {

    return `${hours}h ago`;

  }

  const days =
    Math.floor(hours / 24);

  if (days === 1) {

    return "Yesterday";

  }

  if (days < 7) {

    return `${days}d ago`;

  }

  const weeks =
    Math.floor(days / 7);

  if (weeks < 4) {

    return `${weeks}w ago`;

  }

  const months =
    Math.floor(days / 30);

  if (months < 12) {

    return `${months}mo ago`;

  }

  const years =
    Math.floor(days / 365);

  return `${years}y ago`;

}

/* ==========================================================
 * Group Notifications
 * ========================================================== */

export function groupNotifications(
  notifications: Notification[]
) {

  return notifications.reduce(

    (
      groups,
      notification
    ) => {

      const group =
        getNotificationGroup(
          notification.createdAt
        );

      if (!groups[group]) {

        groups[group] = [];

      }

      groups[group].push(
        notification
      );

      return groups;

    },

    {} as Record<
      NotificationGroup,
      Notification[]
    >

  );

}