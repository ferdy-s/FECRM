"use client";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InvoiceFilters() {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        lg:flex-row
      "
    >
      <Input
        placeholder="Search invoice..."
      />

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Status
          </SelectItem>

          <SelectItem value="paid">
            PAID
          </SelectItem>

          <SelectItem value="partial">
            PARTIAL
          </SelectItem>

          <SelectItem value="unpaid">
            UNPAID
          </SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Payment Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Types
          </SelectItem>

          <SelectItem value="full">
            FULL
          </SelectItem>

          <SelectItem value="termin">
            TERMIN
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}