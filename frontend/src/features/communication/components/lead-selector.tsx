"use client";

import * as React from "react";

import {
  Check,
  ChevronsUpDown,
  Building2,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useLeads } from "@/hooks/use-leads";

import type { Lead } from "@/types/lead";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface LeadSelectorProps {
  value: string;

  onChange: (
    value: string
  ) => void;
}

export function LeadSelector({
  value,
  onChange,
}: LeadSelectorProps) {
  const [open, setOpen] =
    React.useState(false);

  const {
    data = [],
    isLoading,
  } = useLeads();

  const selectedLead =
    React.useMemo(
      () =>
        data.find(
          (lead) =>
            lead.id === value
        ),
      [data, value]
    );

  return (
   <div className="space-y-3">

  <Popover
    open={open}
    onOpenChange={setOpen}
  >
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        className="
          h-auto
          min-h-20
          w-full
          justify-between
          rounded-xl
          border
          px-4
          py-3
          transition-all
          hover:border-primary
          hover:bg-accent/40
        "
      >
        {selectedLead ? (
          <div className="flex w-full items-center gap-4 overflow-hidden">

            <div className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-primary/10
            ">
              <Building2 className="h-6 w-6 text-primary" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col text-left">

              <span className="truncate font-semibold">
                {selectedLead.company}
              </span>

              <span className="truncate text-sm text-muted-foreground">
                {selectedLead.name}
              </span>

              <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">

                {selectedLead.email && (
                  <span className="truncate">
                    {selectedLead.email}
                  </span>
                )}

                {selectedLead.phone && (
                  <span>
                    {selectedLead.phone}
                  </span>
                )}

              </div>

            </div>

          </div>
        ) : (
          <div className="flex items-center gap-4">

            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-lg
              bg-muted
            ">
              <Building2 className="h-6 w-6" />
            </div>

            <div className="text-left">

              <p className="font-medium">
                Select Lead
              </p>

              <p className="text-sm text-muted-foreground">
                Search company or contact person
              </p>

            </div>

          </div>
        )}

        <ChevronsUpDown
          className="ml-4 h-5 w-5 shrink-0 opacity-50"
        />
      </Button>
    </PopoverTrigger>

    <PopoverContent
      align="start"
      className="
        w-[min(96vw,560px)]
        rounded-xl
        p-0
      "
    >

      <Command>

        <div className="border-b p-3">

          <CommandInput
            placeholder="Search company, contact, email or phone..."
          />

        </div>

        <div className="
          flex
          items-center
          justify-between
          border-b
          px-4
          py-2
        ">

          <span className="text-sm font-medium">
            Available Leads
          </span>

          <span className="
            rounded-md
            bg-muted
            px-2
            py-1
            text-xs
            font-medium
          ">
            {data.length} Leads
          </span>

        </div>

        <CommandList className="max-h-[420px]">

          <CommandEmpty>

            {isLoading ? (

              <div className="p-6 text-center text-sm text-muted-foreground">
                Loading leads...
              </div>

            ) : (

              <div className="space-y-2 py-10 text-center">

                <Building2 className="mx-auto h-10 w-10 text-muted-foreground" />

                <p className="font-medium">
                  No Lead Found
                </p>

                <p className="text-sm text-muted-foreground">
                  Try another keyword.
                </p>

              </div>

            )}

          </CommandEmpty>

          <CommandGroup>

            {data.map((lead: Lead) => (

              <CommandItem
                key={lead.id}
                value={[
                  lead.company,
                  lead.name,
                  lead.email,
                  lead.phone,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onSelect={() => {
                  onChange(lead.id);
                  setOpen(false);
                }}
                className="
                  mx-2
                  my-2
                  rounded-lg
                  border
                  p-4
                  transition-colors
                  hover:bg-accent
                "
              >

                <div className="flex w-full gap-4">

                  <div className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-primary/10
                  ">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div>

                        <p className="truncate font-semibold">
                          {lead.company}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">

                          <User className="h-4 w-4" />

                          <span className="truncate">
                            {lead.name}
                          </span>

                        </div>

                      </div>

                      {value === lead.id && (

                        <div className="
                          rounded-md
                          bg-primary
                          px-2
                          py-1
                          text-xs
                          font-medium
                          text-primary-foreground
                        ">
                          Selected
                        </div>

                      )}

                    </div>

                    <div className="mt-3 space-y-1">

                      {lead.email && (

                        <p className="truncate text-xs text-muted-foreground">
                          {lead.email}
                        </p>

                      )}

                      {lead.phone && (

                        <p className="text-xs text-muted-foreground">
                          {lead.phone}
                        </p>

                      )}

                    </div>

                  </div>

                </div>

              </CommandItem>

            ))}

          </CommandGroup>

        </CommandList>

      </Command>

    </PopoverContent>

  </Popover>

</div>
  );
}