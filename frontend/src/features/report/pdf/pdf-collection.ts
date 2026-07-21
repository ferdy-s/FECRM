import jsPDF from "jspdf";

import { CollectionDashboard } from "@/types/report";

function formatCurrency(value: number) {

    return new Intl.NumberFormat(

        "id-ID",

        {

            style: "currency",

            currency: "IDR",

            maximumFractionDigits: 0,

        }

    ).format(value);

}

export function renderCollectionSection(

    doc: jsPDF,

    startY: number,

    collection: CollectionDashboard,

): number {

    ////////////////////////////////////////////////////////////

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const margin = 20;

    const contentWidth =
        pageWidth - margin * 2;

    ////////////////////////////////////////////////////////////

    doc.setDrawColor(225);

    doc.line(

        margin,

        startY,

        pageWidth - margin,

        startY

    );

    ////////////////////////////////////////////////////////////

    startY += 10;

    doc.setFont(

        "helvetica",

        "bold"

    );

    doc.setFontSize(16);

    doc.setTextColor(30);

    doc.text(

        "Collection Overview",

        margin,

        startY

    );

    ////////////////////////////////////////////////////////////

    startY += 7;

    doc.setFont(

        "helvetica",

        "normal"

    );

    doc.setFontSize(10);

    doc.setTextColor(110);

    doc.text(

        "Overall receivable and collection performance.",

        margin,

        startY

    );

    ////////////////////////////////////////////////////////////

    startY += 12;

    const boxGap = 6;

    const boxWidth =
        (contentWidth - boxGap) / 2;

    const boxHeight = 28;

    ////////////////////////////////////////////////////////////

    const metrics = [

        {

            title: "Receivable",

            value: formatCurrency(

                collection.receivable

            ),

        },

        {

            title: "Collected",

            value: formatCurrency(

                collection.collected

            ),

        },

        {

            title: "Outstanding",

            value: formatCurrency(

                collection.outstanding

            ),

        },

        {

            title: "Overdue",

            value: formatCurrency(

                collection.overdue

            ),

        },

    ];

    ////////////////////////////////////////////////////////////

    metrics.forEach(

        (metric, index) => {

            const column =
                index % 2;

            const row =
                Math.floor(index / 2);

            const x =
                margin +
                column *
                    (boxWidth + boxGap);

            const y =
                startY +
                row *
                    (boxHeight + boxGap);

            ////////////////////////////////////////////////////

            doc.setDrawColor(215);

            doc.roundedRect(

                x,

                y,

                boxWidth,

                boxHeight,

                2,

                2

            );

            ////////////////////////////////////////////////////

            doc.setFont(

                "helvetica",

                "bold"

            );

            doc.setFontSize(10);

            doc.setTextColor(100);

            doc.text(

                metric.title,

                x + 5,

                y + 8

            );

            ////////////////////////////////////////////////////

            doc.setFont(

                "helvetica",

                "bold"

            );

            doc.setFontSize(14);

            doc.setTextColor(30);

            doc.text(

                metric.value,

                x + 5,

                y + 19

            );

        }

    );

    ////////////////////////////////////////////////////////////

    startY += 70;

    ////////////////////////////////////////////////////////////

    doc.setDrawColor(215);

    doc.roundedRect(

        margin,

        startY,

        contentWidth,

        25,

        2,

        2

    );

    ////////////////////////////////////////////////////////////

    doc.setFont(

        "helvetica",

        "bold"

    );

    doc.setFontSize(11);

    doc.setTextColor(90);

    doc.text(

        "Collection Performance",

        margin + 5,

        startY + 8

    );

    ////////////////////////////////////////////////////////////

    doc.setFont(

        "helvetica",

        "bold"

    );

    doc.setFontSize(18);

    doc.setTextColor(20);

    doc.text(

        `${collection.collectionRate.toFixed(2)}%`,

        margin + 5,

        startY + 18

    );

    ////////////////////////////////////////////////////////////

    doc.setFont(

        "helvetica",

        "normal"

    );

    doc.setFontSize(9);

    doc.setTextColor(120);

    doc.text(

        `${collection.overdueInvoices} Overdue Invoice(s) • ${collection.overdueDeals} Overdue Deal(s)`,

        pageWidth - margin,

        startY + 18,

        {

            align: "right",

        }

    );

    ////////////////////////////////////////////////////////////

    startY += 40;

    return startY;

}