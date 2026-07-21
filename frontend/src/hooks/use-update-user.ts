"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

import type {
  UpdateUserDto,
  User,
} from "@/types/user";

interface UpdateUserRequest {
  id: string;
  data: UpdateUserDto;
}

export function useUpdateUser() {

  const queryClient =
    useQueryClient();

  return useMutation<
    User,
    Error,
    UpdateUserRequest
  >({

    mutationFn: ({
      id,
      data,
    }) =>
      userService.updateUser(
        id,
        data,
      ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          "users",
        ],
      });

    },

  });

}