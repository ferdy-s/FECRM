export type NotificationType =
  | "ACTIVITY"
  | "PAYMENT"
  | "LEAD_ASSIGNMENT"
  | "INVOICE_DUE";

export interface Notification {

  id: string;

  title: string;

  description: string;

  type: NotificationType;

  read: boolean;

  createdAt: string;
}