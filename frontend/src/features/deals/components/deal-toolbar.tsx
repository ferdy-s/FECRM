"use client";

import {
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  search: string;

  onSearchChange: (
    value: string,
  ) => void;

  status: string;

  onStatusChange: (
    value: string,
  ) => void;

  collection: string;

  onCollectionChange: (
    value: string,
  ) => void;

  onCreate: () => void;

  onRefresh?: () => void;
}

export function DealToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  collection,
  onCollectionChange,
  onCreate,
  onRefresh,
}: Props) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        xl:flex-row
        xl:items-center
        xl:justify-between
      "
    >
      <div
        className="
          flex
          flex-1
          flex-wrap
          gap-3
        "
      >
        <div
          className="
            relative
            min-w-[260px]
            flex-1
          "
        >
          <Search
            className="
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            value={search}
            onChange={(e) =>
              onSearchChange(
                e.target.value,
              )
            }
            placeholder="Search company..."
            className="pl-9"
          />
        </div>

        <Select
          value={status}
          onValueChange={
            onStatusChange
          }
        >
          <SelectTrigger
            className="w-[180px]"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All Status
            </SelectItem>

            <SelectItem value="OPEN">
              Open
            </SelectItem>

            <SelectItem value="NEGOTIATION">
              Negotiation
            </SelectItem>

            <SelectItem value="WON">
              Won
            </SelectItem>

            <SelectItem value="LOST">
              Lost
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={collection}
          onValueChange={
            onCollectionChange
          }
        >
          <SelectTrigger
            className="w-[190px]"
          >
            <SelectValue placeholder="Collection" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All Collection
            </SelectItem>

            <SelectItem value="UNPAID">
              Unpaid
            </SelectItem>

            <SelectItem value="PARTIAL">
              Partial
            </SelectItem>

            <SelectItem value="PAID">
              Paid
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <Button
          variant="outline"
          onClick={onRefresh}
          disabled={!onRefresh}
        >
          <RefreshCw
            className="
              mr-2
              h-4
              w-4
            "
          />

          Refresh
        </Button>

        <Button
          onClick={onCreate}
        >
          <Plus
            className="
              mr-2
              h-4
              w-4
            "
          />

          Create Deal
        </Button>
      </div>
    </div>
  );
}