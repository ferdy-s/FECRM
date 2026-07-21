"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ActivityFilterValue,
} from "./ActivityToolbar";

interface ActivityFiltersProps {
  value: ActivityFilterValue;

  onChange: (
    value: ActivityFilterValue
  ) => void;
}

export function ActivityFilters({
  value,
  onChange,
}: ActivityFiltersProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) =>
        onChange(
          value as ActivityFilterValue
        )
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ALL">
          All Activities
        </SelectItem>

        <SelectItem value="STATUS">
          Status
        </SelectItem>

        <SelectItem value="NEGOTIATION">
          Negotiation
        </SelectItem>

        <SelectItem value="FINANCE">
          Finance
        </SelectItem>

        <SelectItem value="COMMUNICATION">
          Communication
        </SelectItem>

        <SelectItem value="SYSTEM">
          System
        </SelectItem>
      </SelectContent>
    </Select>
  );
}