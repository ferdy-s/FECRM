"use client";

import Link from "next/link";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CTASection() {
    return (
        <section
            id="cta"
            className="relative overflow-hidden py-32"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-violet-600 to-blue-600" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="container relative mx-auto px-6">

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
                    className="mx-auto max-w-4xl text-center text-white"
                >

                    <Badge className="border-white/20 bg-white/10 text-white backdrop-blur">

                        <ShieldCheck className="mr-2 h-4 w-4" />

                        Enterprise Ready

                    </Badge>

                    <h2 className="mt-8 text-5xl font-black leading-tight md:text-6xl">

                        Ready to Transform
                        <br />
                        Your Business?

                    </h2>

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80">

                        Kelola Lead, Sales Pipeline, Invoice,
                        Payment, Collection hingga Executive
                        Reporting dalam satu platform enterprise
                        yang modern dan terintegrasi.

                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">

                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="h-12 rounded-xl px-8"
                        >
                            <Link href="/login">

                                Login to FECRM

                                <ArrowRight className="ml-2 h-4 w-4" />

                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-12 rounded-xl border-white/20 bg-white/10 px-8 text-white hover:bg-white hover:text-primary"
                        >
                            <Link href="#about">

                                Learn More

                            </Link>
                        </Button>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}