"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";

interface Props {
  onCreate: (
    note: string,
  ) => void;

  loading?: boolean;
}

export function CreateNoteDialog({
  onCreate,
  loading = false,
}: Props) {

  const [note, setNote] =
    useState("");

  const [open, setOpen] =
    useState(false);

  function handleSubmit() {

    if (
      !note.trim() ||
      loading
    ) {
      return;
    }

    onCreate(
      note.trim(),
    );

    setNote("");

    setOpen(false);

  }

  return (

    <Dialog
      open={open}
      onOpenChange={(value) => {

        if (!loading) {
          setOpen(value);
        }

      }}
    >

      <DialogTrigger asChild>

        <Button
          size="sm"
          variant="outline"
        >
          <Plus
            className="
              mr-2
              h-4
              w-4
            "
          />

          Add Note

        </Button>

      </DialogTrigger>

      <DialogContent
        className="sm:max-w-lg"
      >

        <DialogHeader>

          <DialogTitle>
            Add Negotiation Note
          </DialogTitle>

          <DialogDescription>
            Catatan ini akan disimpan ke riwayat
            negosiasi lead dan dapat dilihat oleh
            seluruh tim yang memiliki akses.
          </DialogDescription>

        </DialogHeader>

        <Textarea
          rows={8}
          placeholder="Tulis negotiation note..."
          value={note}
          disabled={loading}
          onChange={(e) =>
            setNote(
              e.target.value,
            )
          }
        />

        <DialogFooter>

          <Button
            variant="outline"
            disabled={loading}
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={
              loading ||
              !note.trim()
            }
            onClick={
              handleSubmit
            }
          >
            {loading
              ? "Saving..."
              : "Save Note"}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}