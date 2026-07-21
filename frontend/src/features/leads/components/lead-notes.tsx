"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  CreateNoteDialog,
} from "./create-note-dialog";

import {
  LeadNoteItem,
} from "./lead-note-item";

import {
  useNegotiationNotes,
} from "@/hooks/use-negotiation-notes";

import {
  useCreateNegotiationNote,
} from "@/hooks/use-create-negotiation-note";

interface LeadNotesProps {
  leadId: string;
}

export function LeadNotes({
  leadId,
}: LeadNotesProps) {

  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useNegotiationNotes(
    leadId,
  );

  const createMutation =
    useCreateNegotiationNote();

  function createNote(
    note: string,
  ) {

    createMutation.mutate({

      leadId,

      note,

    });

  }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (isLoading) {

    return (

      <Card className="h-full">

        <CardHeader>

          <CardTitle>

            Negotiation Notes

          </CardTitle>

        </CardHeader>

        <CardContent>

          <div
            className="
              flex
              h-[240px]
              items-center
              justify-center
              text-sm
              text-muted-foreground
            "
          >
            Loading negotiation notes...
          </div>

        </CardContent>

      </Card>

    );

  }

  //////////////////////////////////////////////////////
  // ERROR
  //////////////////////////////////////////////////////

  if (isError) {

    return (

      <Card className="h-full">

        <CardHeader>

          <CardTitle>

            Negotiation Notes

          </CardTitle>

        </CardHeader>

        <CardContent>

          <div
            className="
              flex
              h-[240px]
              items-center
              justify-center
              text-center
              text-sm
              text-red-500
            "
          >

            {error instanceof Error
              ? error.message
              : "Failed to load negotiation notes."}

          </div>

        </CardContent>

      </Card>

    );

  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <Card className="h-full">

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <CardTitle>

            Negotiation Notes

          </CardTitle>

          <Badge
            variant="secondary"
          >

            {notes.length}

          </Badge>

        </div>

        <CreateNoteDialog
          onCreate={
            createNote
          }
          loading={
            createMutation.isPending
          }
        />

      </CardHeader>

      <CardContent>

        {notes.length === 0 ? (

          <div
            className="
              flex
              h-[240px]
              items-center
              justify-center
              text-sm
              text-muted-foreground
            "
          >

            Belum ada Negotiation Note.

          </div>

        ) : (

          <ScrollArea
            className="
              h-[725px]
              pr-4
            "
          >

            <div
              className="
                space-y-4
              "
            >

              {notes.map(
                (note) => (

                  <LeadNoteItem
                    key={note.id}
                    note={note}
                  />

                ),
              )}

            </div>

          </ScrollArea>

        )}

      </CardContent>

    </Card>

  );

}