import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

import { invoiceBreakdownService } from "./invoice-breakdown.service";
import { invoiceTemplateService } from "./invoice-template.service";

export const invoicePdfService = {
  async generate(
    invoiceId: string
  ): Promise<Buffer> {

    console.log("========== PDF GENERATION ==========");
    console.log("Invoice:", invoiceId);
    console.log("Node:", process.version);
    console.log("Platform:", process.platform);
    console.log("Arch:", process.arch);

    const invoice =
      await invoiceBreakdownService.detail(
        invoiceId
      );

    console.log("Invoice data loaded");

    const html =
      await invoiceTemplateService.render(
        invoice
      );

    console.log("Invoice HTML generated");

    console.log("Resolving Chromium executable...");

    const executablePath =
      await chromium.executablePath();

    console.log(
      "Chromium executable:",
      executablePath
    );

    const browser =
      await puppeteer.launch({
        args: chromium.args,
        executablePath,
        defaultViewport:
          chromium.defaultViewport,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
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
            right: "10mm",
            bottom: "10mm",
            left: "10mm",
          },
        });

      console.log(
        "PDF generated successfully"
      );

      return Buffer.from(pdf);

    } catch (error) {

      console.error(
        "PDF generation failed:"
      );

      console.error(error);

      throw error;

    } finally {

      await browser.close();

    }
  },
};
