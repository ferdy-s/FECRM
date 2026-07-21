"use client";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  userService,
} from "@/services/user.service";

export function useUsers(
  role?: string,
) {

  return useQuery({

    queryKey: [
      "users",
      role,
    ],

    queryFn: () =>
      userService.getUsers({
        role,
      }),

  });

}

export function useResetPassword() {

  return useMutation({

    mutationFn: (
      id: string,
    ) =>
      userService.resetPassword(id),

  });

}