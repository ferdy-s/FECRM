import { create } from "zustand";

import {
  AuthUser,
} from "@/types/auth";

interface AuthState {
  token: string | null;

  user: AuthUser | null;

  setAuth: (
    token: string,
    user: AuthUser
  ) => void;

  restoreAuth: (
    token: string,
    user: AuthUser
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthState>(
    (set) => ({

      token: null,

      user: null,

      setAuth: (
        token,
        user
      ) => {

        if (
          typeof window !==
          "undefined"
        ) {
          localStorage.setItem(
            "fecrm_token",
            token
          );

          localStorage.setItem(
            "fecrm_user",
            JSON.stringify(user)
          );
        }

        set({
          token,
          user,
        });
      },

      restoreAuth: (
        token,
        user
      ) =>
        set({
          token,
          user,
        }),

      logout: () => {

        if (
          typeof window !==
          "undefined"
        ) {
          localStorage.removeItem(
            "fecrm_token"
          );

          localStorage.removeItem(
            "fecrm_user"
          );
        }

        set({
          token: null,
          user: null,
        });
      },
    })
  );