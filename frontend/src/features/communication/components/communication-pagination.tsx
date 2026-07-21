"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommunicationPaginationProps {
  page: number;

  totalPages: number;

  pageSize: number;

  totalItems: number;

  onPageChange: (
    page: number
  ) => void;

  onPageSizeChange: (
    pageSize: number
  ) => void;
}

const PAGE_SIZES = [
  10,
  20,
  50,
  100,
];

export function CommunicationPagination({
  page,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: CommunicationPaginationProps) {
  return (
    <div className="flex flex-col gap-4 border-t px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="text-sm text-muted-foreground">
        Total{" "}
        <span className="font-medium text-foreground">
          {totalItems}
        </span>{" "}
        communications
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={String(pageSize)}
          onValueChange={(value) =>
            onPageSizeChange(
              Number(value)
            )
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {PAGE_SIZES.map(
              (size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                >
                  {size} / page
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          disabled={page <= 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="min-w-[90px] text-center text-sm font-medium">
          Page {page} of{" "}
          {totalPages}
        </span>

        <Button
          variant="outline"
          size="icon"
          disabled={
            page >= totalPages
          }
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}