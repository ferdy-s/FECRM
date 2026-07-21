import jsPDF from "jspdf";

import { AgingReport } from "@/types/report";

export function renderAgingSection(

    doc: jsPDF,

    startY: number,

    aging: AgingReport,

): number {

    ////////////////////////////////////////////////////////

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const pageHeight =
        doc.internal.pageSize.getHeight();

    ////////////////////////////////////////////////////////

    let y = startY;

    ////////////////////////////////////////////////////////
    // PAGE BREAK
    ////////////////////////////////////////////////////////

    if (y > pageHeight - 70) {

        doc.addPage();

        y = 20;

    }

    ////////////////////////////////////////////////////////
    // TITLE
    ////////////////////////////////////////////////////////

    doc.setFont("helvetica", "bold");

    doc.setFontSize(16);

    doc.text(

        "Receivable Aging",

        15,

        y

    );

    ////////////////////////////////////////////////////////

    y += 8;

    doc.setFont("helvetica", "normal");

    doc.setFontSize(10);

    doc.setTextColor(110);

    doc.text(

        "Outstanding receivables categorized by invoice aging period.",

        15,

        y

    );

    ////////////////////////////////////////////////////////

    y += 10;

    doc.setDrawColor(220);

    doc.line(

        15,

        y,

        pageWidth - 15,

        y

    );

    ////////////////////////////////////////////////////////

    y += 12;

    const rows = [

        {

            label: "0 - 30 Days",

            value: aging.bucket0to30,

        },

        {

            label: "31 - 60 Days",

            value: aging.bucket31to60,

        },

        {

            label: "61 - 90 Days",

            value: aging.bucket61to90,

        },

        {

            label: "90+ Days",

            value: aging.bucket90plus,

        },

    ];

    ////////////////////////////////////////////////////////

    rows.forEach((row) => {

        doc.setFont(

            "helvetica",

            "bold"

        );

        doc.setFontSize(11);

        doc.setTextColor(30);

        doc.text(

            row.label,

            20,

            y

        );

        ////////////////////////////////////////////////////

        doc.setFont(

            "helvetica",

            "normal"

        );

        doc.text(

            `${row.value.toLocaleString()} Invoice`,

            pageWidth - 20,

            y,

            {

                align: "right",

            }

        );

        ////////////////////////////////////////////////////

        y += 8;

        doc.setDrawColor(235);

        doc.line(

            20,

            y - 3,

            pageWidth - 20,

            y - 3

        );

    });

    ////////////////////////////////////////////////////////

    return y + 8;

}