"use client";

import {
  Activity,
  ArrowRightLeft,
  BarChart4,
  Building2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const reasons = [
  {
    icon: Activity,
    title: "End-to-End Workflow",
    description:
      "Mulai dari Lead, Communication, Negotiation, Deal, Invoice, Payment hingga Reporting berada dalam satu alur kerja yang terintegrasi.",
  },
  {
    icon: Clock3,
    title: "Increase Productivity",
    description:
      "Mengurangi pekerjaan manual dengan proses bisnis yang lebih cepat, terstruktur, dan mudah dipantau.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Role Based Access Control, Audit Trail, Authentication dan pengelolaan hak akses untuk setiap pengguna.",
  },
  {
    icon: BarChart4,
    title: "Real-time Analytics",
    description:
      "Pantau KPI, Revenue, Collection, Sales Performance hingga Executive Dashboard secara real-time.",
  },
  {
    icon: Building2,
    title: "Scalable Platform",
    description:
      "Dirancang menggunakan arsitektur modern sehingga mudah dikembangkan mengikuti kebutuhan perusahaan.",
  },
  {
    icon: ArrowRightLeft,
    title: "Integrated Finance",
    description:
      "Invoice, Payment, Outstanding, Collection hingga Reporting keuangan saling terhubung.",
  },
];

export function WhyFECRM() {
  return (
    <section
      id="why"
      className="relative py-32"
    >
      <div className="container mx-auto px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .6,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto max-w-3xl text-center"
        >

          <Badge
            className="rounded-full px-4 py-2"
          >

            Why FECRM

          </Badge>

          <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">

            Why Choose FECRM
            for Your Business?

          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">

            FECRM dibangun untuk perusahaan yang membutuhkan
            satu platform modern untuk mengelola Sales,
            Customer, Finance, Collection dan Business Analytics
            secara efisien.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {reasons.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * .08,
                }}
                viewport={{
                  once: true,
                }}
              >

                <Card className="group h-full rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-2xl">

                  <CardContent className="p-8">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">

                      <Icon className="h-8 w-8" />

                    </div>

                    <h3 className="mt-8 text-2xl font-bold">

                      {item.title}

                    </h3>

                    <p className="mt-4 leading-7 text-muted-foreground">

                      {item.description}

                    </p>

                  </CardContent>

                </Card>

              </motion.div>

            );

          })}

        </div>

        {/* Bottom Highlight */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .4,
          }}
          viewport={{
            once: true,
          }}
          className="mt-24 overflow-hidden rounded-[36px] border bg-gradient-to-r from-primary to-violet-600 p-[1px]"
        >

          <div className="rounded-[35px] bg-background px-10 py-12">

            <div className="grid items-center gap-10 lg:grid-cols-2">

              <div>

                <Badge variant="secondary">

                  Enterprise Platform

                </Badge>

                <h3 className="mt-6 text-4xl font-black">

                  One Platform.

                  <br />

                  Complete Visibility.

                </h3>

                <p className="mt-6 max-w-xl leading-8 text-muted-foreground">

                  FECRM menghadirkan transparansi penuh
                  terhadap seluruh proses bisnis perusahaan,
                  sehingga setiap Lead, Deal, Invoice,
                  Payment hingga Collection dapat dipantau
                  secara real-time oleh seluruh stakeholder.

                </p>

              </div>

              <div className="grid grid-cols-2 gap-5">

                {[
                  "Lead Tracking",
                  "Sales Pipeline",
                  "Customer Activity",
                  "Invoice",
                  "Payment",
                  "Collection",
                  "Executive Dashboard",
                  "Business Analytics",
                ].map((feature) => (

                  <div
                    key={feature}
                    className="rounded-2xl border bg-muted/40 px-5 py-4 font-medium"
                  >

                    {feature}

                  </div>

                ))}

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}