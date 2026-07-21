export interface Product {
  id: string;

  name: string;

  category: string;

  price: number;

  status:
    | "ACTIVE"
    | "INACTIVE";

  totalDeals: number;

  totalRevenue: number;

  createdAt: string;
}