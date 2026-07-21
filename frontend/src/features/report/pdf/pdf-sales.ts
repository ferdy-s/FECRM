import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { SalesPerformance } from "@/types/report";

function formatCurrency(
    value: number,
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

export function renderSalesSection(

    doc: jsPDF,

    startY: number,

    sales: SalesPerformance[],

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

        "Sales Performance",

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

        "Revenue performance and collection achievement by sales representative.",

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

    const totalSales =
        sales.length;

    const totalDeals =
        sales.reduce(

            (sum, item) =>
                sum + item.totalDeals,

            0

        );

    const totalPipeline =
        sales.reduce(

            (sum, item) =>
                sum + item.pipelineValue,

            0

        );

    const totalCollected =
        sales.reduce(

            (sum, item) =>
                sum + item.collectedRevenue,

            0

        );

    const totalOutstanding =
        sales.reduce(

            (sum, item) =>
                sum + item.outstandingRevenue,

            0

        );

    ////////////////////////////////////////////////////////

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(11);

    doc.setTextColor(30);

    doc.text(

        `Sales Representatives : ${totalSales}`,

        20,

        y

    );

    y += 7;

    doc.text(

        `Total Deals : ${totalDeals}`,

        20,

        y

    );

    y += 7;

    doc.text(

        `Pipeline Value : ${formatCurrency(totalPipeline)}`,

        20,

        y

    );

    y += 7;

    doc.text(

        `Collected Revenue : ${formatCurrency(totalCollected)}`,

        20,

        y

    );

    y += 7;

    doc.text(

        `Outstanding Revenue : ${formatCurrency(totalOutstanding)}`,

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

            "Sales",

            "Deals",

            "Pipeline",

            "Collected",

            "Outstanding",

        ]],

        body:

        sales.map((item) => [

    item.salesName,

    item.totalDeals.toLocaleString(),

    formatCurrency(
        item.pipelineValue
    ),

    formatCurrency(
        item.collectedRevenue
    ),

    formatCurrency(
        item.outstandingRevenue
    ),

]),

foot: [[

    "TOTAL",

    totalDeals.toLocaleString(),

    formatCurrency(
        totalPipeline
    ),

    formatCurrency(
        totalCollected
    ),

    formatCurrency(
        totalOutstanding
    ),

]],

footStyles: {

    fillColor: [243, 244, 246],

    textColor: 30,

    fontStyle: "bold",

},

columnStyles: {

    0: {
        cellWidth: 55,
    },

    1: {
        halign: "center",
        cellWidth: 22,
    },

    2: {
        halign: "right",
        cellWidth: 38,
    },

    3: {
        halign: "right",
        cellWidth: 38,
    },

    4: {
        halign: "right",
        cellWidth: 38,
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

    `Total Sales Representatives : ${totalSales}`,

    20,

    finalY + 18

);

doc.text(

    `Generated by FECRM Reporting Module`,

    pageWidth - 20,

    finalY + 18,

    {

        align: "right",

    }

);

////////////////////////////////////////////////////////

return finalY + 30;

}