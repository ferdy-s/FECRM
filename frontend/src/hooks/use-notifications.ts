import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

import {
  notificationService,
} from "@/services/notification.service";

import {
  Notification,
} from "@/types/notification";

export function useNotifications() {
  return useQuery({
    queryKey:
      queryKeys.notification.notifications,

    queryFn:
      notificationService.getNotifications,

    staleTime: 30_000,

    refetchInterval: 60_000,

    refetchIntervalInBackground: true,

    refetchOnReconnect: true,

    refetchOnWindowFocus: true,
  });
}

export function useMarkRead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      notificationService.markRead,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey:
          queryKeys.notification.notifications,
      });

      const previous =
        queryClient.getQueryData<Notification[]>(
          queryKeys.notification.notifications
        );

      queryClient.setQueryData(
        queryKeys.notification.notifications,
        (old: Notification[] = []) =>
          old.map((item) =>
            item.id === id
              ? {
                  ...item,
                  isRead: true,
                }
              : item
          )
      );

      return {
        previous,
      };
    },

    onError: (
      _error,
      _id,
      context,
    ) => {
      if (context?.previous) {
        queryClient.setQueryData(
          queryKeys.notification.notifications,
          context.previous
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.notification.notifications,
      });
    },
  });
}

export function useDeleteNotification() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      notificationService.deleteNotification,

    onMutate: async (
      id: string,
    ) => {

      await queryClient.cancelQueries({
        queryKey:
          queryKeys.notification.notifications,
      });

      const previous =
        queryClient.getQueryData<Notification[]>(
          queryKeys.notification.notifications
        );

      queryClient.setQueryData(
        queryKeys.notification.notifications,
        (
          old: Notification[] = [],
        ) =>
          old.filter(
            (
              item,
            ) =>
              item.id !== id
          )
      );

      return {
        previous,
      };

    },

    onError: (
      _error,
      _id,
      context,
    ) => {

      if (
        context?.previous
      ) {

        queryClient.setQueryData(
          queryKeys.notification.notifications,
          context.previous
        );

      }

    },

    onSettled: () => {

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.notification.notifications,
      });

    },

  });

}

export function useMarkAllRead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      notificationService.markAllRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.notification.notifications,
      });
    },
  });
}