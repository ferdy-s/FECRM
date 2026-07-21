import { api } from "./api";

import type {
  User,
  UpdateUserDto,
  ResetPasswordResponse,
} from "@/types/user";

export const userService = {

  //////////////////////////////////////////////////////
  // GET USERS
  //////////////////////////////////////////////////////

  async getUsers(
    params?: {
      role?: string;
      isActive?: boolean;
      search?: string;
    },
  ): Promise<User[]> {

    const response =
      await api.get(
        "/users",
        {
          params,
        },
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
// UPDATE USER
//////////////////////////////////////////////////////

async updateUser(
  id: string,
  data: UpdateUserDto,
): Promise<User> {

  const response =
    await api.put(
      `/users/${id}`,
      data,
    );

  return response.data.data;

},

//////////////////////////////////////////////////////
// DELETE USER
//////////////////////////////////////////////////////

async deleteUser(
  id: string,
): Promise<User> {

  const response =
    await api.delete(
      `/users/${id}`,
    );

  return response.data.data;

},

  //////////////////////////////////////////////////////
  // GET SALES USERS
  //////////////////////////////////////////////////////

  async getSalesUsers(): Promise<User[]> {

    const response =
      await api.get(
        "/users",
        {
          params: {
            role: "SALES",
            isActive: true,
          },
        },
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // RESET PASSWORD
  //////////////////////////////////////////////////////

  async resetPassword(
    id: string,
  ): Promise<
    ResetPasswordResponse["data"]
  > {

    const response =
      await api.post<
        ResetPasswordResponse
      >(
        `/users/${id}/reset-password`,
      );

    return response.data.data;

  },

};