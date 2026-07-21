/* ==========================================================
 * Notification
 * ========================================================== */

export interface Notification {
  id: string;

  userId: string;

  title: string;

  message: string;

  isRead: boolean;

  createdAt: string;
}

/* ==========================================================
 * Generic Response
 * ========================================================== */

export interface ApiResponse<T> {
  success: boolean;

  data: T;
}