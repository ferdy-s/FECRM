import jsPDF from "jspdf";

import { FinanceKPI } from "@/types/report";

export function renderFinancialSection(

    doc: jsPDF,

    startY: number,

    finance: FinanceKPI,

): number {

    ////////////////////////////////////////////////////////////

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const pageHeight =
        doc.internal.pageSize.getHeight();

    ////////////////////////////////////////////////////////////

    if (startY > pageHeight - 90) {

        doc.addPage();

        startY = 20;

    }

    ////////////////////////////////////////////////////////////

    const margin = 18;

    const contentWidth =
        pageWidth - margin * 2;

    const cardWidth =
        (contentWidth - 10) / 2;

    const cardHeight = 24;

    ////////////////////////////////////////////////////////////

    doc.setFont("helvetica", "bold");

    doc.setFontSize(17);

    doc.setTextColor(30);

    doc.text(

        "Financial Performance",

        margin,

        startY

    );

    ////////////////////////////////////////////////////////////

    startY += 7;

    doc.setFont("helvetica", "normal");

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.text(

        "Executive financial indicators for receivables and collection performance.",

        margin,

        startY

    );

    ////////////////////////////////////////////////////////////

    startY += 8;

    doc.setDrawColor(220);

    doc.line(

        margin,

        startY,

        pageWidth - margin,

        startY

    );

    ////////////////////////////////////////////////////////////

    startY += 10;

    const metrics = [

        {

            title: "Days Sales Outstanding",

            value: `${finance.dso.toFixed(2)} Days`,

        },

        {

            title: "Collection Rate",

            value: `${finance.collectionRate.toFixed(2)}%`,

        },

        {

            title: "Collection Efficiency",

            value: `${finance.collectionEfficiency.toFixed(2)}%`,

        },

        {

            title: "Average Collection",

            value: `${finance.averageCollectionDays} Day`,

        },

        {

            title: "Overdue Rate",

            value: `${finance.overdueRate.toFixed(2)}%`,

        },

    ];

    ////////////////////////////////////////////////////////////

    metrics.forEach((metric, index) => {

        const column =
            index % 2;

        const row =
            Math.floor(index / 2);

        const x =
            margin +
            column * (cardWidth + 10);

        const y =
            startY +
            row * (cardHeight + 8);

        ////////////////////////////////////////////////////////

        doc.setFillColor(248, 250, 252);

        doc.setDrawColor(225);

        doc.roundedRect(

            x,

            y,

            cardWidth,

            cardHeight,

            2,

            2,

            "FD"

        );

        ////////////////////////////////////////////////////////

        doc.setFont(

            "helvetica",

            "normal"

        );

        doc.setFontSize(9);

        doc.setTextColor(120);

        doc.text(

            metric.title,

            x + 6,

            y + 8

        );

        ////////////////////////////////////////////////////////

        doc.setFont(

            "helvetica",

            "bold"

        );

        doc.setFontSize(15);

        doc.setTextColor(25);

        doc.text(

            metric.value,

            x + 6,

            y + 18

        );

    });

    ////////////////////////////////////////////////////////////

    const totalRows =
        Math.ceil(metrics.length / 2);

    startY +=
        totalRows * (cardHeight + 8);

    ////////////////////////////////////////////////////////////

    doc.setDrawColor(220);

    doc.line(

        margin,

        startY,

        pageWidth - margin,

        startY

    );

    ////////////////////////////////////////////////////////////

    return startY + 10;

}