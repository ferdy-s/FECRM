"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CommunicationDetailSheet,
} from "./communication-detail-sheet";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CommunicationEmpty,
  CommunicationError,
  CommunicationLoading,
} from ".";

import {
  CommunicationHistoryMobileCard,
} from "./communication-history-mobile-card";

import {
  CommunicationHistoryRow,
} from "./communication-history-row";

import {
  CommunicationPagination,
} from "./communication-pagination";

import {
  CommunicationStats,
} from "./communication-stats";

import {
  CommunicationToolbar,
} from "./communication-toolbar";

import type {
  CommunicationLog,
} from "@/types/communication";

interface CommunicationHistoryTableProps {
  data?: CommunicationLog[];

  isLoading?: boolean;

  isFetching?: boolean;

  isError?: boolean;

  refetch?: () => void;
}

export function CommunicationHistoryTable({
  data = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  refetch,
}: CommunicationHistoryTableProps) {
  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const [
    selectedCommunication,
    setSelectedCommunication,
  ] =
    useState<CommunicationLog | null>(
      null
    );

  const filteredData =
    useMemo(() => {
      if (!search.trim()) {
        return data;
      }

      const keyword =
        search.toLowerCase();

      return data.filter(
        (item) =>
          item.message
            .toLowerCase()
            .includes(keyword) ||
          item.channel
            .toLowerCase()
            .includes(keyword) ||
          item.status
            .toLowerCase()
            .includes(keyword)
      );
    }, [data, search]);

  const statistics =
    useMemo(
      () => ({
        total: data.length,

        whatsapp: data.filter(
          (x) =>
            x.channel === "WA"
        ).length,

        email: data.filter(
          (x) =>
            x.channel ===
            "EMAIL"
        ).length,
      }),
      [data]
    );

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredData.length /
          pageSize
      )
    );

    const currentPage = Math.min(
  page,
  totalPages
);

const paginatedData =
  useMemo(() => {
    const start =
      (currentPage - 1) *
      pageSize;

    return filteredData.slice(
      start,
      start + pageSize
    );
  }, [
    filteredData,
    currentPage,
    pageSize,
  ]);

 

  if (isLoading) {
    return (
      <CommunicationLoading />
    );
  }

  if (isError) {
    return (
      <CommunicationError />
    );
  }

  return (
    <>
   <Card className="overflow-hidden rounded-xl">

  <CardHeader className="border-b pb-6">

    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

      <div className="space-y-2">

        <CardTitle className="text-2xl">
          Communication History
        </CardTitle>

        <CardDescription className="max-w-2xl">
          View, search and monitor every communication
          between your sales team and customers across
          WhatsApp and Email channels.
        </CardDescription>

      </div>

      <div className="text-right">

        <p className="text-sm text-muted-foreground">
          Total Records
        </p>

        <p className="text-3xl font-bold">
          {filteredData.length}
        </p>

      </div>

    </div>

  </CardHeader>

  <CardContent className="space-y-6 p-6">

    <CommunicationStats
      total={statistics.total}
      whatsapp={statistics.whatsapp}
      email={statistics.email}
    />

    <div className="rounded-xl border bg-card p-4">

      <CommunicationToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

    </div>

    <div className="rounded-xl border overflow-hidden">

      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">

        <div>

          <h3 className="font-semibold">
            Communication Records
          </h3>

          <p className="text-sm text-muted-foreground">
            Showing {paginatedData.length} of{" "}
            {filteredData.length} records
          </p>

        </div>

      </div>

      {filteredData.length === 0 ? (

        <div className="py-16">
          <CommunicationEmpty />
        </div>

      ) : (

        <>

          <div className="hidden lg:block">

            <ScrollArea className="w-full">

              <div className="min-w-[980px]">

                <Table>

                  <TableHeader className="sticky top-0 z-20 bg-background">

                    <TableRow>

                      <TableHead className="w-[120px]">
                        Channel
                      </TableHead>

                      <TableHead className="w-[140px]">
                        Direction
                      </TableHead>

                      <TableHead>
                        Message
                      </TableHead>

                      <TableHead className="w-[120px]">
                        Status
                      </TableHead>

                      <TableHead className="w-[180px]">
                        Sent At
                      </TableHead>

                      <TableHead className="w-[60px]" />

                    </TableRow>

                  </TableHeader>

                  <TableBody>

                    {paginatedData.map((communication) => (

                      <CommunicationHistoryRow
                        key={communication.id}
                        communication={communication}
                        onSelect={setSelectedCommunication}
                      />

                    ))}

                  </TableBody>

                </Table>

              </div>

            </ScrollArea>

          </div>

          <div className="space-y-4 p-4 lg:hidden">

            {paginatedData.map((communication) => (

              <CommunicationHistoryMobileCard
                key={communication.id}
                communication={communication}
                onSelect={setSelectedCommunication}
              />

            ))}

          </div>

          <div className="border-t bg-muted/20">

            <CommunicationPagination
              page={currentPage}
              pageSize={pageSize}
              totalItems={filteredData.length}
              totalPages={totalPages}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />

          </div>

        </>

      )}

    </div>

  </CardContent>

</Card>

     <CommunicationDetailSheet
  open={!!selectedCommunication}
  communication={
    selectedCommunication
  }
  onOpenChange={(open: boolean) => {
    if (!open) {
      setSelectedCommunication(
        null
      );
    }
  }}
/>
    </>
  );
}