"use client";

import Link from "next/link";

import {
    ArrowRight,
    BarChart3,
    Building2,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Background */}

            <div className="absolute inset-0 -z-20 bg-background" />

            {/* Aurora */}

            <div className="absolute left-1/2 top-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

            <div className="absolute right-0 top-40 -z-10 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[120px]" />

            {/* Grid */}

            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#64748b12_1px,transparent_1px),linear-gradient(to_bottom,#64748b12_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="container mx-auto px-6 pt-36 pb-28">

                <div className="grid items-center gap-20 lg:grid-cols-2">

                    {/* LEFT */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: .6,
                        }}
                        className="space-y-8"
                    >

                        <Badge
                            variant="secondary"
                            className="rounded-full px-5 py-2 text-sm"
                        >
                            <ShieldCheck className="mr-2 h-4 w-4" />

                            Enterprise CRM Platform
                        </Badge>

                        <div className="space-y-6">

                            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-foreground md:text-6xl xl:text-7xl">

                                Manage Sales,

                                <br />

                                Finance &

                                <span className="block bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">

                                    Business Growth

                                </span>

                                in One Platform.

                            </h1>

                            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">

                                FECRM adalah platform Enterprise Customer Relationship
                                Management yang membantu perusahaan mengelola Lead,
                                Customer, Deal, Invoice, Payment, Collection,
                                hingga Executive Reporting dalam satu sistem
                                yang modern, aman, dan terintegrasi.

                            </p>

                        </div>

                        {/* CTA */}

                        <div className="flex flex-wrap gap-4">

                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-xl px-8"
                            >
                                <Link href="/login">

                                    Login to FECRM

                                    <ArrowRight className="ml-2 h-4 w-4" />

                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-12 rounded-xl px-8"
                            >
                                <Link href="#about">

                                    Explore Platform

                                </Link>
                            </Button>

                        </div>

                        {/* Enterprise Badge */}

                        <div className="grid grid-cols-2 gap-5 pt-6 md:grid-cols-4">

                            <div className="flex items-center gap-3 rounded-xl border bg-background/60 p-4 backdrop-blur">

                                <Building2 className="h-5 w-5 text-primary" />

                                <div>

                                    <p className="text-sm font-semibold">

                                        Enterprise

                                    </p>

                                    <p className="text-xs text-muted-foreground">

                                        Ready

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3 rounded-xl border bg-background/60 p-4 backdrop-blur">

                                <BarChart3 className="h-5 w-5 text-primary" />

                                <div>

                                    <p className="text-sm font-semibold">

                                        Analytics

                                    </p>

                                    <p className="text-xs text-muted-foreground">

                                        Realtime

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3 rounded-xl border bg-background/60 p-4 backdrop-blur">

                                <ShieldCheck className="h-5 w-5 text-primary" />

                                <div>

                                    <p className="text-sm font-semibold">

                                        Security

                                    </p>

                                    <p className="text-xs text-muted-foreground">

                                        RBAC

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3 rounded-xl border bg-background/60 p-4 backdrop-blur">

                                <CheckCircle2 className="h-5 w-5 text-primary" />

                                <div>

                                    <p className="text-sm font-semibold">

                                        Production

                                    </p>

                                    <p className="text-xs text-muted-foreground">

                                        Ready

                                    </p>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                    {/* RIGHT */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 60,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: .8,
                        }}
                        className="relative"

                    >

                      <div className="relative mx-auto w-full max-w-[620px]">

  {/* Glow */}

  <div className="absolute inset-0 rounded-[36px] bg-primary/10 blur-3xl" />

  {/* Main Dashboard */}

  <div className="relative overflow-hidden rounded-[32px] border bg-background/80 shadow-2xl backdrop-blur-xl">

    {/* Header */}

    <div className="flex items-center justify-between border-b px-6 py-5">

      <div>

        <p className="text-sm text-muted-foreground">

          Executive Dashboard

        </p>

        <h3 className="mt-1 text-xl font-bold">

          FECRM Analytics

        </h3>

      </div>

      <Badge>

        Live

      </Badge>

    </div>

    {/* Content */}

    <div className="space-y-6 p-6">

      {/* KPI */}

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-2xl border bg-card p-5">

          <p className="text-sm text-muted-foreground">

            Revenue

          </p>

          <h2 className="mt-3 text-3xl font-black">

            Rp8.2B

          </h2>

          <p className="mt-2 text-sm font-medium text-emerald-600">

            ↑ 18.4%

          </p>

        </div>

        <div className="rounded-2xl border bg-card p-5">

          <p className="text-sm text-muted-foreground">

            Collection

          </p>

          <h2 className="mt-3 text-3xl font-black">

            92%

          </h2>

          <p className="mt-2 text-sm font-medium text-emerald-600">

            ↑ 5.2%

          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="rounded-2xl border bg-card p-5">

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h4 className="font-semibold">

              Monthly Revenue

            </h4>

            <p className="text-sm text-muted-foreground">

              Last 6 months

            </p>

          </div>

        </div>

        <div className="flex h-40 items-end justify-between gap-3">

          {[40, 70, 55, 90, 75, 120].map((item) => (

            <motion.div
              key={item}
              initial={{
                height: 0,
              }}
              animate={{
                height: item,
              }}
              transition={{
                duration: .7,
              }}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-violet-500"
            />

          ))}

        </div>

      </div>

      {/* Bottom */}

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-2xl border bg-card p-5">

          <p className="text-sm text-muted-foreground">

            Active Deals

          </p>

          <h2 className="mt-2 text-2xl font-bold">

            247

          </h2>

        </div>

        <div className="rounded-2xl border bg-card p-5">

          <p className="text-sm text-muted-foreground">

            Outstanding

          </p>

          <h2 className="mt-2 text-2xl font-bold">

            Rp1.4B

          </h2>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="rounded-2xl border bg-card p-5">

        <div className="mb-4 flex items-center justify-between">

          <h4 className="font-semibold">

            Recent Activities

          </h4>

          <Badge
            variant="secondary"
          >

            Today

          </Badge>

        </div>

        <div className="space-y-4">

          {[
            "Lead PT Astra berhasil dikonversi menjadi Deal",
            "Invoice INV-2026-008 berhasil dibayar",
            "Collection PT Maju Bersama telah selesai",
          ].map((item) => (

            <div
              key={item}
              className="flex items-start gap-3"
            >

              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />

              <p className="text-sm text-muted-foreground">

                {item}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  </div>

  {/* Floating Card */}

  <motion.div
    animate={{
      y: [0, -12, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 4,
    }}
    className="absolute -left-10 top-16 hidden w-56 rounded-2xl border bg-background p-5 shadow-xl xl:block"
  >

    <p className="text-sm text-muted-foreground">

      Pipeline

    </p>

    <h3 className="mt-2 text-3xl font-black">

      78%

    </h3>

    <p className="mt-2 text-sm text-emerald-600">

      Healthy Growth

    </p>

  </motion.div>

  <motion.div
    animate={{
      y: [0, 10, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 5,
    }}
    className="absolute -right-10 bottom-10 hidden w-56 rounded-2xl border bg-background p-5 shadow-xl xl:block"
  >

    <p className="text-sm text-muted-foreground">

      Sales Growth

    </p>

    <h3 className="mt-2 text-3xl font-black">

      +24%

    </h3>

    <p className="mt-2 text-sm text-emerald-600">

      This Month

    </p>

  </motion.div>

</div>

                    </motion.div>

                </div>

            </div>

        </section>
    );
}