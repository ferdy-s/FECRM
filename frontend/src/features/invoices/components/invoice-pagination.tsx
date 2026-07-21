"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

interface Props {

  page: number;

  totalPages: number;

  pageSize: number;

  totalItems: number;

  onPageChange: (
    page: number,
  ) => void;

}

export function InvoicePagination({

  page,

  totalPages,

  pageSize,

  totalItems,

  onPageChange,

}: Props) {

  const start =

    totalItems === 0

      ? 0

      : (page - 1) *

          pageSize +

        1;

  const end =

    Math.min(

      page * pageSize,

      totalItems,

    );

  const pages =

    Array.from(

      {

        length: totalPages,

      },

      (_, index) =>

        index + 1,

    );

  return (

    <div
      className="
        mt-6
        flex
        flex-col
        gap-4
        border-t
        pt-5
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >

      <div
        className="
          text-sm
          text-muted-foreground
        "
      >

        Showing{" "}

        <span className="font-medium">

          {start}

        </span>

        {" "}-

        <span className="font-medium">

          {end}

        </span>

        {" "}of{" "}

        <span className="font-medium">

          {totalItems}

        </span>

        {" "}invoice(s)

      </div>

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-end
          gap-2
        "
      >

        <Button

          size="icon"

          variant="outline"

          disabled={page === 1}

          onClick={() =>

            onPageChange(

              page - 1,

            )

          }

        >

          <ChevronLeft
            className="
              h-4
              w-4
            "
          />

        </Button>

        {pages.map(

          (item) => (

            <Button

              key={item}

              size="icon"

              variant={

                item === page

                  ? "default"

                  : "outline"

              }

              className="
                h-9
                w-9
              "

              onClick={() =>

                onPageChange(

                  item,

                )

              }

            >

              {item}

            </Button>

          ),

        )}

        <Button

          size="icon"

          variant="outline"

          disabled={
            page >=
            totalPages
          }

          onClick={() =>

            onPageChange(

              page + 1,

            )

          }

        >

          <ChevronRight
            className="
              h-4
              w-4
            "
          />

        </Button>

      </div>

    </div>

  );

}