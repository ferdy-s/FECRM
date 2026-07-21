"use client";

import { useMemo, useState } from "react";

import {
    ChevronLeft,
    ChevronRight,
    Search,
} from "lucide-react";

import {
    SalesPerformance,
} from "@/types/report";

import {
    Input,
} from "@/components/ui/input";

import {
    Button,
} from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface SalesPerformanceTableProps {
    data: SalesPerformance[];
}

const PAGE_SIZE = 5;

function formatCurrency(
    value: number
) {
    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }
    ).format(value);
}

export function SalesPerformanceTable({

    data,

}: SalesPerformanceTableProps) {

    ////////////////////////////////////////////////////////

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    ////////////////////////////////////////////////////////
    // SEARCH + SORT
    ////////////////////////////////////////////////////////

    const filteredData =
        useMemo(() => {

            return [...data]

                .sort((a, b) =>
                    a.salesName.localeCompare(
                        b.salesName
                    )
                )

                .filter((sales) => {

                    const keyword =
                        search.toLowerCase();

                    return (

                        sales.salesName
                            .toLowerCase()
                            .includes(keyword)

                    );

                });

        }, [data, search]);

    ////////////////////////////////////////////////////////
    // PAGINATION
    ////////////////////////////////////////////////////////

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredData.length /
                PAGE_SIZE
            )
        );

    const currentPage =
        Math.min(
            page,
            totalPages
        );

    const startIndex =
        (currentPage - 1) *
        PAGE_SIZE;

    const paginatedData =
        filteredData.slice(
            startIndex,
            startIndex +
            PAGE_SIZE
        );

    ////////////////////////////////////////////////////////

    const showingFrom =
        filteredData.length === 0
            ? 0
            : startIndex + 1;

    const showingTo =
        Math.min(
            startIndex + PAGE_SIZE,
            filteredData.length
        );

    ////////////////////////////////////////////////////////

    const previousPage =
        () =>
            setPage((page) =>
                Math.max(
                    1,
                    page - 1
                )
            );

    const nextPage =
        () =>
            setPage((page) =>
                Math.min(
                    totalPages,
                    page + 1
                )
            );

    ////////////////////////////////////////////////////////

    return (

        <div className="space-y-4">

            {/* ======================================================
               SEARCH BAR
            ======================================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >

                <div
                    className="
                        relative
                        w-full
                        md:max-w-sm
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
                        placeholder="Search sales representative..."
                        onChange={(e) => {

                            setSearch(
                                e.target.value
                            );

                            setPage(1);

                        }}
                        className="pl-9"
                    />
            </div>
            </div>

            <div
                className="
                    overflow-x-auto
                    rounded-lg
                    border
                "
            >

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead className="min-w-[240px]">

                                Sales Representative

                            </TableHead>

                            <TableHead className="text-center w-24">

                                Deals

                            </TableHead>

                            <TableHead className="text-right min-w-[170px]">

                                Pipeline Value

                            </TableHead>

                            <TableHead className="text-right min-w-[180px]">

                                Collected Revenue

                            </TableHead>

                            <TableHead className="text-right min-w-[190px]">

                                Outstanding Revenue

                            </TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {paginatedData.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={5}
                                    className="
                                        h-40
                                        text-center
                                        text-muted-foreground
                                    "
                                >

                                    No sales representative found.

                                </TableCell>

                            </TableRow>

                        ) : (

                            paginatedData.map((sales) => (

                                <TableRow
                                    key={sales.salesId}
                                    className="hover:bg-muted/40"
                                >

                                    <TableCell>

                                        <div className="space-y-1">

                                            <div
                                                className="
                                                    font-semibold
                                                "
                                            >

                                                {sales.salesName}

                                            </div>

                                            <div
                                                className="
                                                    text-xs
                                                    text-muted-foreground
                                                "
                                            >

                                                Sales Representative

                                            </div>

                                        </div>

                                    </TableCell>

                                    <TableCell
                                        className="
                                            text-center
                                        "
                                    >

                                        <span
                                            className="
                                                inline-flex
                                                min-w-10
                                                items-center
                                                justify-center
                                                rounded-md
                                                bg-primary/10
                                                px-2
                                                py-1
                                                text-sm
                                                font-semibold
                                                text-primary
                                            "
                                        >

                                            {sales.totalDeals}

                                        </span>

                                    </TableCell>

                                    <TableCell
                                        className="
                                            text-right
                                            font-medium
                                            whitespace-nowrap
                                        "
                                    >

                                        {formatCurrency(
                                            sales.pipelineValue
                                        )}

                                    </TableCell>

                                    <TableCell
                                        className="
                                            text-right
                                            font-semibold
                                            text-emerald-600
                                            whitespace-nowrap
                                        "
                                    >

                                        {formatCurrency(
                                            sales.collectedRevenue
                                        )}

                                    </TableCell>

                                    <TableCell
                                        className="
                                            text-right
                                            font-semibold
                                            text-red-600
                                            whitespace-nowrap
                                        "
                                    >

                                        {formatCurrency(
                                            sales.outstandingRevenue
                                        )}

                                    </TableCell>

                                </TableRow>

                            ))

                        )}

                    </TableBody>

                </Table>

            </div>
            <div
                className="
                    flex
                    flex-col
                    gap-4
                    border-t
                    pt-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >

                <div
                    className="
                        text-sm
                        text-muted-foreground
                    "
                >

                    Showing{" "}

                    <span className="font-medium">

                        {showingFrom}

                    </span>

                    {" "}to{" "}

                    <span className="font-medium">

                        {showingTo}

                    </span>

                    {" "}of{" "}

                    <span className="font-medium">

                        {filteredData.length}

                    </span>

                    {" "}sales representatives

                </div>

                <div
                    className="
                        flex
                        items-center
                        justify-end
                        gap-2
                    "
                >

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={previousPage}
                        disabled={currentPage === 1}
                    >

                        <ChevronLeft className="mr-1 h-4 w-4" />

                        Previous

                    </Button>

                    <div
                        className="
                            min-w-[90px]
                            text-center
                            text-sm
                            font-medium
                        "
                    >

                        Page {currentPage} of {totalPages}

                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={nextPage}
                        disabled={
                            currentPage === totalPages
                        }
                    >

                        Next

                        <ChevronRight className="ml-1 h-4 w-4" />

                    </Button>

                </div>

            </div>

        </div>

    );

}