import puppeteer from "puppeteer";

import {
  invoiceBreakdownService,
} from "./invoice-breakdown.service";

import {
  invoiceTemplateService,
} from "./invoice-template.service";

export const invoicePdfService = {

  async generate(
    invoiceId:string
  ){

    const invoice =
      await invoiceBreakdownService.detail(
        invoiceId
      );

      console.log(
  JSON.stringify(
    invoice,
    null,
    2
  )
);

   const html =
  await invoiceTemplateService.render(
    invoice
  );

    const browser = await puppeteer.launch({
  headless: true,

  executablePath:
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
});

    const page =
      await browser.newPage();

   await page.setContent(html);

await page.waitForNetworkIdle();

    const pdf =
      await page.pdf({
        format:"A4",
        printBackground:true
      });

    await browser.close();

    return Buffer.from(pdf);

  }

};