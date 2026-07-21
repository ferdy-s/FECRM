"use client";

import { StickyNote } from "lucide-react";

import type {
  NegotiationNote,
} from "@/types/negotiation-note";

interface Props {
  note: NegotiationNote;
}

export function LeadNoteItem({
  note,
}: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        p-4
        transition-colors
        hover:bg-muted/40
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <StickyNote
          className="
            mt-1
            h-4
            w-4
            shrink-0
            text-muted-foreground
          "
        />

        <div className="flex-1">
          <p
            className="
              whitespace-pre-wrap
              text-sm
              leading-6
            "
          >
            {note.note}
          </p>

          <div
            className="
              mt-3
              flex
              flex-wrap
              items-center
              gap-2
              text-xs
              text-muted-foreground
            "
          >
            <span>
              {note.user?.email ?? "-"}
            </span>

            <span>•</span>

            <span>
              {note.user?.role ?? "-"}
            </span>

            <span>•</span>

            <span>
              {new Intl.DateTimeFormat(
                "id-ID",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              ).format(
                new Date(note.createdAt),
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}