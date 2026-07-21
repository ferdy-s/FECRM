import { Negotiation }
from "../types/negotiation.type";

export const negotiations: Negotiation[] = [
  {
    id: "1",
    offerNumber: 1,
    amount: 120000000,
    note: "Initial Offer",
    status: "PENDING",
    createdAt: "10 Mei 2025",
  },

  {
    id: "2",
    offerNumber: 2,
    amount: 100000000,
    note: "Counter Offer",
    status: "PENDING",
    createdAt: "11 Mei 2025",
  },

  {
    id: "3",
    offerNumber: 3,
    amount: 95000000,
    note: "Final Offer",
    status: "APPROVED",
    createdAt: "12 Mei 2025",
  },
];