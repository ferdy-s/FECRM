"use client";

import {
  useState,
} from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Textarea,
} from "@/components/ui/textarea";

import {
  Plus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ActivityType,
} from "../types/lead-activity.type";

interface Props {
  onCreate: (
    activity: {
      type: ActivityType;
      title: string;
      description: string;
    }
  ) => void;
}

export function CreateActivityDialog({
  onCreate,
}: Props) {
  const [type, setType] =
  useState<ActivityType>(
    "CALL"
  );

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Log Activity
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Activity
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select
  value={type}
  onValueChange={(value) =>
    setType(
      value as ActivityType
    )
  }
>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="CALL">
                Call
              </SelectItem>

              <SelectItem value="EMAIL">
                Email
              </SelectItem>

              <SelectItem value="WHATSAPP">
                WhatsApp
              </SelectItem>

              <SelectItem value="MEETING">
                Meeting
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <Button
            className="w-full"
            onClick={() =>
              onCreate({
                type,
                title,
                description,
              })
            }
          >
            Save Activity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}