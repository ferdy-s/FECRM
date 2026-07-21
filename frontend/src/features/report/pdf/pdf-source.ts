import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { SourcePerformance } from "@/types/report";

function formatPercentage(
    value: number,
) {

    return `${value.toFixed(2)}%`;

}

export function renderSourceSection(

    doc: jsPDF,

    startY: number,

    sources: SourcePerformance[],

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

    if (y > pageHeight - 90) {

        doc.addPage();

        y = 20;

    }

    ////////////////////////////////////////////////////////
    // TITLE
    ////////////////////////////////////////////////////////

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(16);

    doc.text(

        "Lead Source Performance",

        15,

        y

    );

    ////////////////////////////////////////////////////////

    y += 8;

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(10);

    doc.setTextColor(110);

    doc.text(

        "Lead acquisition and conversion performance by marketing source.",

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
    // SUMMARY
    ////////////////////////////////////////////////////////

    y += 10;

    const totalSources =
        sources.length;

    const totalLead =
        sources.reduce(

            (sum, item) =>

                sum + item.totalLead,

            0

        );

    const totalWon =
        sources.reduce(

            (sum, item) =>

                sum + item.totalWon,

            0

        );

    const averageConversion =
        totalSources === 0

            ? 0

            : sources.reduce(

                (sum, item) =>

                    sum + item.conversionRate,

                0

            ) / totalSources;

    ////////////////////////////////////////////////////////

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(11);

    doc.setTextColor(30);

    doc.text(

        `Lead Sources : ${totalSources}`,

        20,

        y

    );

    y += 7;

    doc.text(

        `Total Leads : ${totalLead}`,

        20,

        y

    );

    y += 7;

    doc.text(

        `Total Won : ${totalWon}`,

        20,

        y

    );

    y += 7;

    doc.text(

        `Average Conversion : ${formatPercentage(
            averageConversion
        )}`,

        20,

        y

    );

    ////////////////////////////////////////////////////////

    y += 12;

    ////////////////////////////////////////////////////////
    // TABLE
    ////////////////////////////////////////////////////////

    autoTable(doc, {

        startY: y,

        theme: "grid",

        styles: {

            fontSize: 9,

            cellPadding: 3,

            valign: "middle",

        },

        headStyles: {

            fillColor: [79, 70, 229],

            textColor: 255,

            fontStyle: "bold",

        },

        head: [[

            "Lead Source",

            "Total Leads",

            "Won",

            "Conversion Rate",

        ]],

        body:

        sources.map((item) => [

    item.sourceName,

    item.totalLead.toLocaleString(),

    item.totalWon.toLocaleString(),

    formatPercentage(
        item.conversionRate
    ),

]),

foot: [[

    "TOTAL",

    totalLead.toLocaleString(),

    totalWon.toLocaleString(),

    formatPercentage(
        averageConversion
    ),

]],

footStyles: {

    fillColor: [243, 244, 246],

    textColor: 30,

    fontStyle: "bold",

},

columnStyles: {

    0: {
        cellWidth: 70,
    },

    1: {
        halign: "center",
        cellWidth: 35,
    },

    2: {
        halign: "center",
        cellWidth: 35,
    },

    3: {
        halign: "right",
        cellWidth: 40,
    },

},

didDrawPage: () => {

    const currentPage =
        doc.getCurrentPageInfo().pageNumber;

    doc.setFontSize(9);

    doc.setTextColor(120);

    doc.text(

        `Page ${currentPage}`,

        pageWidth - 20,

        pageHeight - 10,

        {

            align: "right",

        }

    );

},

});

////////////////////////////////////////////////////////

const finalY =
    (doc as jsPDF & {
        lastAutoTable?: {
            finalY: number;
        };
    }).lastAutoTable?.finalY ?? y;

////////////////////////////////////////////////////////

doc.setDrawColor(220);

doc.line(

    15,

    finalY + 8,

    pageWidth - 15,

    finalY + 8

);

////////////////////////////////////////////////////////

doc.setFont(
    "helvetica",
    "italic"
);

doc.setFontSize(9);

doc.setTextColor(120);

doc.text(

    `Total Lead Sources : ${totalSources}`,

    20,

    finalY + 18

);

doc.text(

    "Generated by FECRM Reporting Module",

    pageWidth - 20,

    finalY + 18,

    {

        align: "right",

    }

);

////////////////////////////////////////////////////////

return finalY + 30;

}