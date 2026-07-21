import {
  Badge,
} from "@/components/ui/badge";

import type {
  CommunicationStatus,
} from "@/types/communication";

interface Props {
  status: CommunicationStatus;
}

const STATUS_VARIANTS: Record<
  CommunicationStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  },

  SENT: {
    label: "Sent",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  },

  DELIVERED: {
    label: "Delivered",
    className:
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  },

  READ: {
    label: "Read",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  },

  FAILED: {
    label: "Failed",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  },
};

export function CommunicationStatusBadge({
  status,
}: Props) {
  const item =
    STATUS_VARIANTS[status];

  return (
    <Badge
      variant="secondary"
      className={item.className}
    >
      {item.label}
    </Badge>
  );
}