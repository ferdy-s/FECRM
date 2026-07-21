import { api } from "./api";

import {
  ApiResponse,
  Notification,
} from "@/types/notification";

export const notificationService = {
  async getNotifications() {
    const { data } =
      await api.get<
        ApiResponse<Notification[]>
      >("/notifications");

    return data.data;
  },

  async markRead(id: string) {
    await api.patch(
      `/notifications/${id}/read`
    );
  },

  async markUnread(id: string) {
    await api.patch(
      `/notifications/${id}/unread`
    );
  },

  async markAllRead() {
    await api.patch(
      "/notifications/read-all"
    );
  },

  async deleteNotification(id: string) {
    await api.delete(
      `/notifications/${id}`
    );
  },
};