import type { Metadata } from "next";

import { About } from "@/components/landing/about";
import { CTASection } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { LandingNavbar } from "@/components/landing/navbar";
import { WhyFECRM } from "@/components/landing/why-fecrm";

export const metadata: Metadata = {
  title: "FECRM | Future Enterprise CRM",
  description:
    "Future Enterprise CRM Platform untuk mengelola Lead, Sales, Finance, Collection, dan Reporting dalam satu sistem terintegrasi.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingNavbar />

      <Hero />

      <About />

      <WhyFECRM />

      <CTASection />

      <Footer />
    </main>
  );
}