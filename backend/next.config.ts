import type { NextConfig } from "next";


const nextConfig: NextConfig = {

  serverExternalPackages: [
    "@sparticuz/chromium",
    "puppeteer-core",
  ],


  outputFileTracingIncludes: {

    "/app/api/invoices/[id]/route": [

      "./node_modules/@sparticuz/chromium/bin/**"

    ],

  },

};


export default nextConfig;
