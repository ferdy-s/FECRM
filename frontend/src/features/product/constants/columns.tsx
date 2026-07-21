import type { ColumnDef } from "@tanstack/react-table";

import type { Product } from "@/types/product";

import { ProductRowAction } from "../components/product-row-action";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.original.price),
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <ProductRowAction
        product={row.original}
      />
    ),
  },
];