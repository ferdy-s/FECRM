import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
  Inter,
} from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";

import {
  Toaster,
} from "@/components/ui/sonner";

import {
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  QueryProvider,
} from "@/providers/query-provider";

import {
  ThemeProvider,
} from "@/providers/theme-provider";

import {
  AuthProvider,
} from "@/providers/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {

  title: {

    default: "FECRM",

    template: "%s | FECRM",

  },

  description:
    "Future Enterprise Customer Relationship Management",

};

export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {

  return (

    <html

      lang="id"

      suppressHydrationWarning

      className={cn(

        "h-full",

        "font-sans",

        "antialiased",

        inter.variable,

        geistSans.variable,

        geistMono.variable,

      )}

    >

      <body

        className={cn(

          "min-h-screen",

          "bg-background",

          "font-sans",

          "antialiased",

        )}

      >

        <ThemeProvider>

          <TooltipProvider

            delayDuration={200}

            skipDelayDuration={0}

          >

            <QueryProvider>

              <AuthProvider>

                {children}

                <Toaster richColors />

              </AuthProvider>

            </QueryProvider>

          </TooltipProvider>

        </ThemeProvider>

      </body>

    </html>

  );

}