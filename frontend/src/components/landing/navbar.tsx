"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navigation = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Why FECRM",
    href: "#why",
  },
  {
    label: "Contact",
    href: "#cta",
  },
];

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll,
      );
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
            F
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight">
              FECRM
            </p>

            <p className="text-xs text-muted-foreground">
              Future Enterprise CRM
            </p>
          </div>
        </Link>

        {/* Desktop */}

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action */}

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="outline"
          >
            <Link href="#about">
              Explore
            </Link>
          </Button>

          <Button asChild>
            <Link href="/login">
              Login

              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile */}

        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background lg:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-6 py-6">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                {item.label}
              </a>
            ))}

            <Button
              asChild
              className="mt-3"
            >
              <Link href="/login">
                Login
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}