import jsPDF from "jspdf";

import { PipelineOverview } from "@/types/report";

export function renderPipelineSection(

    doc: jsPDF,

    startY: number,

    pipeline: PipelineOverview,

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

        "Sales Pipeline",

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

        "Monitor lead progression and overall sales conversion performance.",

        margin,

        startY

    );

    ////////////////////////////////////////////////////////////

    startY += 12;

    const gap = 4;

    const boxWidth =
        (contentWidth - gap * 3) / 4;

    const boxHeight = 34;

    ////////////////////////////////////////////////////////////

    const metrics = [

        {

            title: "Lead",

            value: pipeline.totalLead,

            color: [37, 99, 235],

        },

        {

            title: "Negotiation",

            value: pipeline.totalNegotiation,

            color: [245, 158, 11],

        },

        {

            title: "Won",

            value: pipeline.totalWon,

            color: [22, 163, 74],

        },

        {

            title: "Lost",

            value: pipeline.totalLost,

            color: [220, 38, 38],

        },

    ];

    ////////////////////////////////////////////////////////////

    metrics.forEach(

        (metric, index) => {

            const x =
                margin +
                index *
                    (boxWidth + gap);

            ////////////////////////////////////////////////////

            doc.setDrawColor(215);

            doc.roundedRect(

                x,

                startY,

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

            doc.setFontSize(9);

            doc.setTextColor(120);

            doc.text(

                metric.title,

                x + 4,

                startY + 8

            );

            ////////////////////////////////////////////////////

            doc.setTextColor(

                metric.color[0],

                metric.color[1],

                metric.color[2]

            );

            doc.setFontSize(18);

            doc.text(

                String(metric.value),

                x + 4,

                startY + 22

            );

        }

    );

    ////////////////////////////////////////////////////////////

    startY += 48;

    ////////////////////////////////////////////////////////////
    // CONVERSION SUMMARY
    ////////////////////////////////////////////////////////////

    const conversionRate =
        pipeline.totalLead === 0

            ? 0

            : (
                  (pipeline.totalWon /
                      pipeline.totalLead) *
                  100
              );

    ////////////////////////////////////////////////////////////

    doc.setDrawColor(215);

    doc.roundedRect(

        margin,

        startY,

        contentWidth,

        26,

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

        "Lead Conversion Rate",

        margin + 5,

        startY + 8

    );

    ////////////////////////////////////////////////////////////

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(18);

    doc.setTextColor(

        22,

        163,

        74

    );

    doc.text(

        `${conversionRate.toFixed(2)}%`,

        margin + 5,

        startY + 19

    );

    ////////////////////////////////////////////////////////////

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(120);

    doc.text(

        `${pipeline.totalWon} Won • ${pipeline.totalLost} Lost • ${pipeline.totalNegotiation} Negotiation`,

        pageWidth - margin,

        startY + 19,

        {

            align: "right",

        }

    );

    ////////////////////////////////////////////////////////////

    startY += 40;

    return startY;

}