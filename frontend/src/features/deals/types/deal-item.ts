export type ItemType =
  | "PRODUCT"
  | "SERVICE";

export interface DealItem {

  id: string;

  dealId: string;

  type: ItemType;

  refId: string;

  itemName: string | null;

  quantity: number;

  price: number;

  unitPrice: number | null;

  totalPrice: number | null;

  createdAt: string;

}