"use client";

import {
  useState,
} from "react";

import {
  EditQuantityDialog,
} from "./edit-quantity-dialog";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
  HandCoins,
  Package,
  BriefcaseBusiness,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  RequestNegotiationDialog,
} from "./request-negotiation-dialog";

import {
  DeleteItemDialog,
} from "./delete-item-dialog";

import type {
  Deal,
  TransactionItem,
} from "@/types/deal";

interface Props {
  deal: Deal;
}

function currency(
  value: number,
) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  ).format(value);
}

export function TransactionItemTable({
  deal,
}: Props) {
const [selectedItem, setSelectedItem] =
  useState<TransactionItem | null>(null);

const [openEditQuantity, setOpenEditQuantity] =
  useState(false);

const [openNegotiation, setOpenNegotiation] =
  useState(false);

  const [
  openDeleteDialog,
  setOpenDeleteDialog,
] = useState(false);

  const items =
    deal.items ?? [];

    

  return (

    <Card> 

      <CardHeader>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <CardTitle>

            Transaction Items

          </CardTitle>

          <Badge>

            {items.length} Item

          </Badge>

        </div>

      </CardHeader>

      <CardContent>

        {items.length === 0 ? (

          <div
            className="
              flex
              h-52
              items-center
              justify-center
              rounded-lg
              border
              text-sm
              text-muted-foreground
            "
          >

            Belum ada Product / Service yang ditambahkan.

          </div>

        ) : (

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>

                  Type

                </TableHead>

                <TableHead>

                  Item

                </TableHead>

                <TableHead className="text-center">

                  Qty

                </TableHead>

                <TableHead className="text-right">

                  Unit Price

                </TableHead>

                <TableHead className="text-right">

                  Total

                </TableHead>

                <TableHead
                  className="
                    w-[70px]
                    text-right
                  "
                >

                  Action

                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>
                {items.map((item: TransactionItem) => (

  <TableRow
    key={item.id}
  >

    <TableCell>

      <Badge
        variant="secondary"
        className="gap-2"
      >

        {item.type === "PRODUCT" ? (

          <Package
            className="h-3.5 w-3.5"
          />

        ) : (

          <BriefcaseBusiness
            className="h-3.5 w-3.5"
          />

        )}

        {item.type}

      </Badge>

    </TableCell>

    <TableCell>

      <div
        className="
          flex
          flex-col
        "
      >

        <span
          className="
            font-medium
          "
        >

          {item.itemName}

        </span>

      </div>

    </TableCell>

    <TableCell
      className="
        text-center
      "
    >

      {item.quantity}

    </TableCell>

    <TableCell
      className="
        text-right
      "
    >

      {currency(
        Number(
          item.unitPrice ??
          item.price,
        ),
      )}

    </TableCell>

    <TableCell
      className="
        text-right
        font-semibold
      "
    >

      {currency(
        Number(
          item.totalPrice ??
          item.price,
        ),
      )}

    </TableCell>

    <TableCell
      className="
        text-right
      "
    >

   <DropdownMenu>

  <DropdownMenuTrigger asChild>

    <Button
      variant="ghost"
      size="icon"
    >

      <MoreHorizontal
        className="h-4 w-4"
      />

    </Button>

  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    className="w-56"
  >

    <DropdownMenuItem

      onSelect={(e) => {

        e.preventDefault();

        setSelectedItem(item);

        setOpenEditQuantity(true);

      }}

    >

      <Pencil
        className="mr-2 h-4 w-4"
      />

      Edit Quantity

    </DropdownMenuItem>

    <DropdownMenuItem

      onSelect={(e) => {

        e.preventDefault();

        setSelectedItem(item);

        setOpenNegotiation(true);

      }}

    >

      <HandCoins
        className="mr-2 h-4 w-4"
      />

      Request Negotiation

    </DropdownMenuItem>

    <DropdownMenuItem

  className="
    text-destructive
    focus:text-destructive
  "

  onSelect={(e) => {

    e.preventDefault();

    setSelectedItem(item);

    setOpenDeleteDialog(true);

  }}

>

  <Trash2
    className="
      mr-2
      h-4
      w-4
    "
  />

  Delete Item

</DropdownMenuItem>

  </DropdownMenuContent>

</DropdownMenu>

    </TableCell>

  </TableRow>

))}
            </TableBody>

          </Table>

)}

{selectedItem && (

  <EditQuantityDialog
  item={selectedItem}
  dealStatus={deal.status}
  open={openEditQuantity}
  onOpenChange={setOpenEditQuantity}
/>

)}

{selectedItem && (

<RequestNegotiationDialog
  deal={deal}
  item={selectedItem}
  scope="ITEM"
  dealStatus={deal.status}
  open={openNegotiation}
  onOpenChange={setOpenNegotiation}
/>

)}

{selectedItem && (

  <DeleteItemDialog

    item={selectedItem}

    open={openDeleteDialog}

    onOpenChange={
      setOpenDeleteDialog
    }

  />

)}


      </CardContent>

    </Card>

  );

}