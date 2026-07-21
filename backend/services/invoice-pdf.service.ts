import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

import { invoiceBreakdownService } from "./invoice-breakdown.service";
import { invoiceTemplateService } from "./invoice-template.service";

export const invoicePdfService = {
  async generate(invoiceId: string): Promise<Buffer> {
    const invoice = await invoiceBreakdownService.detail(invoiceId);

    console.log(JSON.stringify(invoice, null, 2));

    const html = await invoiceTemplateService.render(invoice);

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    try {
      const page = await browser.newPage();

      await page.setContent(html);

      await page.waitForNetworkIdle();

      await page.emulateMediaType("screen");

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });

      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  },
};