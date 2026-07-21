"use client";

import { useState } from "react";

import {
  Button,
} from "@/components/ui/button";

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
  UserPlus,
} from "lucide-react";

import {
  useUsers,
} from "@/hooks/use-users";

interface Props {
  onAssign: (
    userId: string
  ) => void;
}

export function AssignUserDialog({
  onAssign,
}: Props) {

  const [userId, setUserId] =
    useState("");

  const {
    data: users = [],
  } = useUsers("SALES");

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Assign Lead
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Assign Lead
          </DialogTitle>
        </DialogHeader>

        <Select
          value={userId}
          onValueChange={setUserId}
        >

          <SelectTrigger>
            <SelectValue
              placeholder="Select Sales"
            />
          </SelectTrigger>

          <SelectContent>

            {users.map(
              (user) => (
                <SelectItem
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </SelectItem>
              )
            )}

          </SelectContent>

        </Select>

        <Button
          disabled={!userId}
          onClick={() =>
            onAssign(userId)
          }
        >
          Save Assignment
        </Button>

      </DialogContent>

    </Dialog>
  );
}