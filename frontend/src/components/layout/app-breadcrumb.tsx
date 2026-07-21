"use client";

import Link from "next/link";

import {
  ChevronRight,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

const routeLabels: Record<
  string,
  string
> = {

  dashboard: "Dashboard",

  leads: "Lead Management",

  deals: "Deals",

  negotiations: "Negotiations",

  products: "Products",

  services: "Services",

  invoices: "Invoices",

  collections: "Collections",

  communications: "Communication Logs",

  reports: "Reports",

  settings: "Settings",

};

export function AppBreadcrumb() {

  const pathname =
    usePathname();

  const segments =
    pathname
      .split("/")
      .filter(Boolean);

  return (

    <nav
      className="
        flex
        items-center
        gap-2
        text-sm
        text-muted-foreground
      "
    >

      {segments.map(
        (
          segment,
          index,
        ) => {

          //////////////////////////////////////////////////
          // HIDE UUID
          //////////////////////////////////////////////////

          if (
            /^[0-9a-fA-F-]{36}$/.test(
              segment,
            )
          ) {

            const previous =
              segments[
                index - 1
              ];

            let label =
              "Detail";

            if (
              previous ===
              "leads"
            ) {

              label =
                "Lead Detail";

            }

            if (
              previous ===
              "deals"
            ) {

              label =
                "Deal Detail";

            }

            if (
              previous ===
              "products"
            ) {

              label =
                "Product Detail";

            }

            if (
              previous ===
              "services"
            ) {

              label =
                "Service Detail";

            }

            return (

              <div
                key={segment}
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <ChevronRight
                  className="
                    h-4
                    w-4
                  "
                />

                <span
                  className="
                    font-medium
                    text-foreground
                  "
                >
                  {label}
                </span>

              </div>

            );

          }

          const href =
            "/" +
            segments
              .slice(
                0,
                index + 1,
              )
              .join("/");

          return (

            <div
              key={href}
              className="
                flex
                items-center
                gap-2
              "
            >

              {index !== 0 && (

                <ChevronRight
                  className="
                    h-4
                    w-4
                  "
                />

              )}

              <Link
                href={href}
                className="
                  hover:text-foreground
                  transition-colors
                "
              >

                {routeLabels[
                  segment
                ] ??
                  segment}

              </Link>

            </div>

          );

        },
      )}

    </nav>

  );

}