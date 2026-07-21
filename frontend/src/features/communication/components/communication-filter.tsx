"use client";

import {
  Input,
} from "@/components/ui/input";

import {
  Search,
} from "lucide-react";

interface Props {
  value: string;

  onChange: (
    value: string
  ) => void;
}

export function CommunicationFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={value}
          placeholder="Search message..."
          className="pl-10"
          onChange={(e) =>
            onChange(e.target.value)
          }
        />
      </div>
    </div>
  );
}