import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

import { invoiceBreakdownService } from "./invoice-breakdown.service";
import { invoiceTemplateService } from "./invoice-template.service";


export const invoicePdfService = {

  async generate(
    invoiceId: string
  ): Promise<Buffer> {


    console.log(
      "Generating invoice PDF:",
      invoiceId
    );


    const invoice =
      await invoiceBreakdownService.detail(
        invoiceId
      );


    console.log(
      "Invoice data loaded"
    );


    const html =
      await invoiceTemplateService.render(
        invoice
      );


    console.log(
      "Invoice HTML generated"
    );


    const executablePath =
      await chromium.executablePath();


    console.log(
      "Chromium path:",
      executablePath
    );


    const browser =
      await puppeteer.launch({

        args: chromium.args,

        executablePath,

        headless: true,

      });


    try {


      const page =
        await browser.newPage();


      await page.setViewport({

        width: 1280,

        height: 900,

      });


      await page.setContent(
        html,
        {
          waitUntil: "networkidle0",
        }
      );


      await page.emulateMediaType(
        "screen"
      );


      const pdf =
        await page.pdf({

          format: "A4",

          printBackground: true,

          preferCSSPageSize: true,

          margin: {

            top: "10mm",

            bottom: "10mm",

            left: "10mm",

            right: "10mm",

          },

        });


      console.log(
        "PDF generated successfully"
      );


      return Buffer.from(pdf);


    } catch(error){


      console.error(
        "PDF generation failed:",
        error
      );


      throw error;


    } finally {


      await browser.close();


    }

  },

};
