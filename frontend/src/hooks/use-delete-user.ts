"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  userService,
} from "@/services/user.service";

import {
  queryKeys,
} from "@/lib/query-keys";

export function useDeleteUser() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string,
    ) =>
      userService.deleteUser(
        id,
      ),

   onSuccess: () => {

  queryClient.invalidateQueries({

    queryKey:
      queryKeys.user.all,

  });

}

  });

}