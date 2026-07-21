"use client";

import { useState } from "react";

import {
    FileDown,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Button,
} from "@/components/ui/button";

import { exportReportPdf } from "../pdf/export-report";

import {
    Checkbox,
} from "@/components/ui/checkbox";

import {
    Input,
} from "@/components/ui/input";

import {
    Label,
} from "@/components/ui/label";

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const REPORTS = [
    {
        id: "financial",
        label: "Financial Performance",
    },
    {
        id: "collection",
        label: "Collection Overview",
    },
    {
        id: "pipeline",
        label: "Sales Pipeline",
    },
    {
        id: "aging",
        label: "Receivable Aging",
    },
    {
        id: "sales",
        label: "Sales Performance",
    },
    {
        id: "source",
        label: "Lead Source Performance",
    },
];

export function ExportReportDialog() {

    const [exportAll, setExportAll] =
        useState(true);

    const [selectedReports, setSelectedReports] =
        useState<string[]>([]);

    const [fileName, setFileName] =
        useState("FECRM Report");

    const [orientation, setOrientation] =
        useState("portrait");

    const [paperSize, setPaperSize] =
        useState("A4");

    ////////////////////////////////////////////////////////

    function toggleReport(id: string) {

        if (selectedReports.includes(id)) {

            setSelectedReports((prev) =>
                prev.filter((item) => item !== id)
            );

            return;
        }

        setSelectedReports((prev) => [
            ...prev,
            id,
        ]);

    }

    ////////////////////////////////////////////////////////

async function handleExport() {

    if (
    !exportAll &&
    selectedReports.length === 0
) {

    alert(
        "Please select at least one report section."
    );

    return;

}

    await exportReportPdf({

        companyName:
            "PT Reliable Future Technology",

        generatedBy:
            "Administrator",

        fileName,

        exportAll,

        selectedReports,

        orientation:
            orientation as "portrait" | "landscape",

        paperSize:
            paperSize as "A4" | "Letter",

    });

}

    ////////////////////////////////////////////////////////

    return (

        <Dialog>

            <DialogTrigger asChild>

                <Button  variant="outline"
    className="w-full sm:w-auto min-w-[180px]">

                    <FileDown className="mr-2 h-4 w-4" />

                    Export PDF

                </Button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        Export Reports

                    </DialogTitle>

                    <DialogDescription>

                        Select the report sections to include in the PDF document.

                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-8 py-4">

                    {/* EXPORT ALL */}

                    <div className="space-y-4">

                        <div className="flex items-center space-x-3">

                            <Checkbox
                                checked={exportAll}
                                onCheckedChange={(checked) => {

                                    setExportAll(Boolean(checked));

                                    if (checked) {
                                        setSelectedReports([]);
                                    }

                                }}
                            />

                            <Label>

                                Export Entire Report

                            </Label>

                        </div>

                    </div>

                    {/* REPORT LIST */}

                    <div className="space-y-4">

                        <Label>

                            Report Sections

                        </Label>

                        <div className="grid gap-3 md:grid-cols-2">

                            {REPORTS.map((report) => (

                                <div
                                    key={report.id}
                                    className="
                                        flex
                                        items-center
                                        space-x-3
                                        rounded-lg
                                        border
                                        p-3
                                    "
                                >

                                    <Checkbox
                                        checked={
                                            selectedReports.includes(
                                                report.id
                                            )
                                        }
                                        disabled={exportAll}
                                        onCheckedChange={() =>
                                            toggleReport(
                                                report.id
                                            )
                                        }
                                    />

                                    <Label>

                                        {report.label}

                                    </Label>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* FILE NAME */}

                    <div className="space-y-2">

                        <Label>

                            File Name

                        </Label>

                        <Input
                            value={fileName}
                            onChange={(e) =>
                                setFileName(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                 <div
    className="
        grid
        gap-6
        md:grid-cols-2
    "
>

    {/* ORIENTATION */}

    <div className="space-y-3">

        <Label>

            Orientation

        </Label>

        <RadioGroup
            value={orientation}
            onValueChange={setOrientation}
            className="
                flex
                items-center
                gap-6
                rounded-lg
                border
                p-4
            "
        >

            <div className="flex items-center space-x-2">

                <RadioGroupItem
                    value="portrait"
                    id="portrait"
                />

                <Label
                    htmlFor="portrait"
                    className="cursor-pointer"
                >

                    Portrait

                </Label>

            </div>

            <div className="flex items-center space-x-2">

                <RadioGroupItem
                    value="landscape"
                    id="landscape"
                />

                <Label
                    htmlFor="landscape"
                    className="cursor-pointer"
                >

                    Landscape

                </Label>

            </div>

        </RadioGroup>

    </div>

    {/* PAPER SIZE */}

    <div className="space-y-3">

        <Label>

            Paper Size

        </Label>

        <Select
            value={paperSize}
            onValueChange={setPaperSize}
        >

            <SelectTrigger className="h-12">

                <SelectValue placeholder="Select paper size" />

            </SelectTrigger>

            <SelectContent>

                <SelectItem value="A4">

                    A4

                </SelectItem>

                <SelectItem value="Letter">

                    Letter

                </SelectItem>

            </SelectContent>

        </Select>

    </div>

</div>

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleExport}
                    >

                        <FileDown className="mr-2 h-4 w-4" />

                        Export PDF

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}