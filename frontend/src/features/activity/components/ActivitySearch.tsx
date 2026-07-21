"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface ActivitySearchProps {
  value: string;
  onChange(value: string): void;
}

export function ActivitySearch({
  value,
  onChange,
}: ActivitySearchProps) {
  return (
    <div className="relative w-full md:max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search activity..."
        className="pl-10"
      />
    </div>
  );
}