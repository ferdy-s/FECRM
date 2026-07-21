"use client";

import Link from "next/link";

import {
    Mail,
    Phone,
    Globe,
    ArrowUpRight,
} from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">

            <div className="container mx-auto px-6 py-16">

                <div className="grid gap-10 lg:grid-cols-4">

                    {/* Logo */}

                    <div>

                        <h2 className="text-2xl font-black">

                            FECRM

                        </h2>

                        <p className="mt-4 leading-7 text-muted-foreground">

                            Future Enterprise CRM Platform
                            yang membantu perusahaan
                            mengelola Sales, Finance,
                            Collection dan Executive
                            Reporting secara modern.

                        </p>

                    </div>

                    {/* Platform */}

                    <div>

                        <h3 className="font-semibold">

                            Platform

                        </h3>

                        <div className="mt-5 space-y-3">

                            <Link
                                href="#about"
                                className="block text-muted-foreground hover:text-primary"
                            >
                                About
                            </Link>

                            <Link
                                href="#why"
                                className="block text-muted-foreground hover:text-primary"
                            >
                                Why FECRM
                            </Link>

                            <Link
                                href="/login"
                                className="block text-muted-foreground hover:text-primary"
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                    {/* Modules */}

                    <div>

                        <h3 className="font-semibold">

                            Modules

                        </h3>

                        <div className="mt-5 space-y-3">

                            <p className="text-muted-foreground">

                                CRM

                            </p>

                            <p className="text-muted-foreground">

                                Finance

                            </p>

                            <p className="text-muted-foreground">

                                Reporting

                            </p>

                            <p className="text-muted-foreground">

                                Collection

                            </p>

                        </div>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="font-semibold">

                            Connect

                        </h3>

                    <div className="mt-6 space-y-4">

    <a
        href="mailto:info@fecrm.id"
        className="flex items-center gap-3 text-muted-foreground transition hover:text-primary"
    >
        <Mail className="h-5 w-5" />

        info@fecrm.id
    </a>

    <a
        href="#"
        className="flex items-center gap-3 text-muted-foreground transition hover:text-primary"
    >
        <Phone className="h-5 w-5" />

        +62 812 xxxx xxxx
    </a>

    <a
        href="#"
        className="flex items-center gap-3 text-muted-foreground transition hover:text-primary"
    >
        <Globe className="h-5 w-5" />

        www.fecrm.id
    </a>

</div>

                    </div>

                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t pt-8 text-sm text-muted-foreground md:flex-row">

                    <p>

                        © {new Date().getFullYear()} FECRM.
                        All rights reserved.

                    </p>

                    <div className="flex gap-6">

                        <Link
                            href="#"
                            className="hover:text-primary"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="#"
                            className="hover:text-primary"
                        >
                            Terms
                        </Link>

                        <Link
                            href="#"
                            className="hover:text-primary"
                        >
                            Security
                        </Link>

                    </div>

                </div>

            </div>

        </footer>
    );
}