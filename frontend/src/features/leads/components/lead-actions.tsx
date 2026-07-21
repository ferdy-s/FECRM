"use client";

import {
  Edit,
  Activity,
  ArrowRightLeft,
  MoreHorizontal,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LeadActions() {
  return (
    <div
      className="
        flex
        items-center
        justify-end
        gap-2
        flex-wrap
      "
    >
      {/* Secondary */}

      <Button
        variant="outline"
        size="sm"
        className="
          h-9
          px-4
          font-medium
        "
      >
        <Edit
          className="
            mr-2
            h-4
            w-4
          "
        />

        Edit Lead
      </Button>

      {/* Secondary */}

      <Button
        variant="outline"
        size="sm"
        className="
          h-9
          px-4
          font-medium
        "
      >
        <Activity
          className="
            mr-2
            h-4
            w-4
          "
        />

        Add Activity
      </Button>

      {/* Primary */}

      <Button
        size="sm"
        className="
          h-9
          px-5
          font-medium
        "
      >
        <ArrowRightLeft
          className="
            mr-2
            h-4
            w-4
          "
        />

        Convert To Deal
      </Button>

      {/* More Actions */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="
              h-9
              w-9
            "
          >
            <MoreHorizontal
              className="
                h-4
                w-4
              "
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-52"
        >
          <DropdownMenuItem>
            Assign User
          </DropdownMenuItem>

          <DropdownMenuItem>
            Send Email
          </DropdownMenuItem>

          <DropdownMenuItem>
            Send WhatsApp
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            Create Note
          </DropdownMenuItem>

          <DropdownMenuItem>
            Create Task
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="
              text-destructive
            "
          >
            Delete Lead
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}