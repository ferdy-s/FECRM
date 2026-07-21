"use client";

import {
    BarChart3,
    BriefcaseBusiness,
    CircleDollarSign,
    ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

const features = [
    {
        icon: BriefcaseBusiness,
        title: "CRM Management",
        description:
            "Kelola Lead, Customer, Activity, Pipeline hingga Deal dalam satu sistem yang terintegrasi.",
    },
    {
        icon: CircleDollarSign,
        title: "Finance Management",
        description:
            "Mendukung Invoice, Payment, Collection serta monitoring Outstanding secara real-time.",
    },
    {
        icon: BarChart3,
        title: "Business Intelligence",
        description:
            "Executive Dashboard dengan KPI, Revenue Analytics, Sales Performance, dan Reporting.",
    },
];

export function About() {
    return (
        <section
            id="about"
            className="relative py-32"
        >
            <div className="container mx-auto px-6">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
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

                    <Badge className="rounded-full px-4 py-2">

                        About FECRM

                    </Badge>

                    <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">

                        One Platform for Your Entire Business

                    </h2>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground">

                        Future Enterprise CRM (FECRM) merupakan platform
                        Enterprise Customer Relationship Management yang
                        dirancang untuk membantu perusahaan mengelola
                        seluruh proses bisnis mulai dari Lead Management,
                        Sales Pipeline, Finance, Collection hingga Executive
                        Reporting dalam satu platform yang modern,
                        aman, dan scalable.

                    </p>

                </motion.div>

                <div className="mt-20 grid gap-8 lg:grid-cols-3">

                    {features.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <motion.div
                                key={item.title}
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * .15,
                                }}
                                viewport={{
                                    once: true,
                                }}
                            >

                                <Card
                                    className="group h-full rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >

                                    <CardContent className="space-y-6 p-8">

                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">

                                            <Icon className="h-8 w-8" />

                                        </div>

                                        <div>

                                            <h3 className="text-2xl font-bold">

                                                {item.title}

                                            </h3>

                                            <p className="mt-4 leading-7 text-muted-foreground">

                                                {item.description}

                                            </p>

                                        </div>

                                    </CardContent>

                                </Card>

                            </motion.div>

                        );

                    })}

                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: .5,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="mt-20 rounded-[32px] border bg-muted/30 p-10"
                >

                    <div className="grid gap-10 lg:grid-cols-2">

                        <div>

                            <Badge
                                variant="secondary"
                            >

                                Enterprise Ready

                            </Badge>

                            <h3 className="mt-6 text-3xl font-black">

                                Built for Modern Companies

                            </h3>

                            <p className="mt-6 leading-8 text-muted-foreground">

                                FECRM mengintegrasikan Sales,
                                Customer Relationship,
                                Finance,
                                Collection,
                                hingga Executive Dashboard
                                ke dalam satu platform yang
                                membantu perusahaan mengambil
                                keputusan lebih cepat,
                                meningkatkan produktivitas tim,
                                serta menjaga seluruh proses
                                bisnis tetap transparan.

                            </p>

                        </div>

                        <div className="grid grid-cols-2 gap-5">

                            {[
                                "Lead Management",
                                "Sales Pipeline",
                                "Deal Tracking",
                                "Invoice",
                                "Payment",
                                "Collection",
                                "Executive KPI",
                                "Analytics",
                            ].map((item) => (

                                <div
                                    key={item}
                                    className="flex items-center gap-3 rounded-2xl border bg-background p-5"
                                >

                                    <ShieldCheck className="h-5 w-5 text-primary" />

                                    <span className="font-medium">

                                        {item}

                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}