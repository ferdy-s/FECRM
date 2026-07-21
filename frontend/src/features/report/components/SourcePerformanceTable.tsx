"use client";

import { Globe, RefreshCw } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { useSourcePerformance } from "@/hooks/use-report";

export function SourcePerformanceTable() {

    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useSourcePerformance();

    ////////////////////////////////////////////////////////

    return (

        <section className="space-y-4">

            <Card className="overflow-hidden">

                <CardHeader
                    className="
                        border-b
                        bg-muted/30
                        flex
                        flex-col
                        gap-2
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <CardTitle className="text-lg">

                        • Lead Source Performance

                    </CardTitle>

                    <p
                        className="
                            max-w-mt
                            text-sm
                            text-muted-foreground
                            lg:text-right
                        "
                    >

                        Compare lead volume and conversion rate by acquisition channel.

                    </p>

                </CardHeader>

                <CardContent className="p-0">

                    {isLoading && (

                        <div className="flex h-56 items-center justify-center">

                            <p className="text-muted-foreground">

                                Loading lead source performance...

                            </p>

                        </div>

                    )}

                    {!isLoading && isError && (

                        <div className="flex h-56 flex-col items-center justify-center gap-4">

                            <Globe className="h-10 w-10 text-destructive" />

                            <div className="space-y-2 text-center">

                                <h3 className="font-semibold">

                                    Failed to load lead source performance

                                </h3>

                                <p className="text-sm text-muted-foreground">

                                    Unable to retrieve reporting data.

                                </p>

                                <Button
                                    variant="outline"
                                    onClick={() => refetch()}
                                >

                                    <RefreshCw className="mr-2 h-4 w-4" />

                                    Retry

                                </Button>

                            </div>

                        </div>

                    )}

                    {!isLoading &&
                        !isError &&
                        data.length === 0 && (

                            <div className="flex h-56 flex-col items-center justify-center gap-4">

                                <Globe className="h-10 w-10 text-muted-foreground" />

                                <div className="text-center">

                                    <h3 className="font-semibold">

                                        No Lead Source Data

                                    </h3>

                                    <p className="text-sm text-muted-foreground">

                                        No lead source performance is available.

                                    </p>

                                </div>

                            </div>

                        )}

                    {!isLoading &&
                        !isError &&
                        data.length > 0 && (

                            <div className="overflow-x-auto">

                                <Table>

                                    <TableHeader>

                                        <TableRow>

                                            <TableHead>

                                                Lead Source

                                            </TableHead>

                                            <TableHead className="text-center">

                                                Leads

                                            </TableHead>

                                            <TableHead className="text-center">

                                                Won

                                            </TableHead>

                                            <TableHead className="text-right">

                                                Conversion Rate

                                            </TableHead>

                                        </TableRow>

                                    </TableHeader>

                                    <TableBody>

                                        {data.map((source) => (

                                            <TableRow
                                                key={source.sourceId}
                                            >

                                                <TableCell className="font-medium">

                                                    {source.sourceName}

                                                </TableCell>

                                                <TableCell className="text-center">

                                                    {source.totalLead}

                                                </TableCell>

                                                <TableCell className="text-center">

                                                    {source.totalWon}

                                                </TableCell>

                                                <TableCell className="text-right font-semibold">

                                                    {source.conversionRate.toFixed(2)}%

                                                </TableCell>

                                            </TableRow>

                                        ))}

                                    </TableBody>

                                </Table>

                            </div>

                        )}

                </CardContent>

            </Card>

        </section>

    );

}