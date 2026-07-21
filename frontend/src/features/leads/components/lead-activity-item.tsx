import {
  Phone,
  Mail,
  MessageCircle,
  CalendarDays,
  Trash2,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import type {
  LeadActivity,
} from "../types/lead-activity.type";

function getIcon(
  type: LeadActivity["type"]
) {
  switch (type) {
    case "CALL":
      return (
        <Phone className="h-4 w-4" />
      );

    case "EMAIL":
      return (
        <Mail className="h-4 w-4" />
      );

    case "WHATSAPP":
      return (
        <MessageCircle className="h-4 w-4" />
      );

    case "MEETING":
      return (
        <CalendarDays className="h-4 w-4" />
      );

    default:
      return null;
  }
}

interface Props {
  activity: LeadActivity;

  onDelete: (
    id: string
  ) => void;
}

export function LeadActivityItem({
  activity,
  onDelete,
}: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        p-4
        transition-all
        hover:bg-muted/30
      "
    >
      <div
        className="
          flex
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-muted
          "
        >
          {getIcon(
            activity.type
          )}
        </div>

        <div className="flex-1">
          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >
            <div>
              <h4
                className="
                  font-medium
                "
              >
                {activity.title}
              </h4>

              <p
                className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
              >
                {
                  activity.description
                }
              </p>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                onDelete(
                  activity.id
                )
              }
            >
              <Trash2
                className="
                  h-4
                  w-4
                  text-red-500
                "
              />
            </Button>
          </div>

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              text-xs
              text-muted-foreground
            "
          >
            <span>
              {
                activity.createdBy
              }
            </span>

            <span>
              {
                activity.createdAt
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}