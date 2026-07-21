"use client";

import { useState } from "react";

import {
  LayoutGrid,
  TableProperties,
} from "lucide-react";

import { useRole } from "@/hooks/use-role";

import {
  Button,
} from "@/components/ui/button";

import {
  LeadTable,
} from "./lead-table";

import {
  LeadKanban,
} from "./lead-kanban";

export function LeadViewSwitcher() {

  const role = useRole();

  const [view, setView] =
    useState<
      "table" | "kanban"
    >("table");

  if (!role) {
    return null;
  }

  return (
    <div className="space-y-6">

      <div
        className="
          flex
          items-center
          justify-end
          gap-2
        "
      >
        <Button
          variant={
            view === "table"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setView("table")
          }
        >
          <TableProperties
            className="
              mr-2
              h-4
              w-4
            "
          />
          Table
        </Button>

        <Button
          variant={
            view === "kanban"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setView("kanban")
          }
        >
          <LayoutGrid
            className="
              mr-2
              h-4
              w-4
            "
          />
          Kanban
        </Button>
        
      </div>

      {view === "table" ? (
        <LeadTable role={role} />
      ) : (
        <LeadKanban />
      )}

    </div>
  );
}