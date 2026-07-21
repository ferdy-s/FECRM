"use client";

import {
  useEffect,
} from "react";

import {
  useAuthStore,
} from "@/stores/auth-store";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const restoreAuth =
    useAuthStore(
      (state) =>
        state.restoreAuth
    );

  useEffect(() => {

    const token =
      localStorage.getItem(
        "fecrm_token"
      );

    const user =
      localStorage.getItem(
        "fecrm_user"
      );

    if (
      token &&
      user
    ) {
      restoreAuth(
        token,
        JSON.parse(user)
      );
    }

  }, [restoreAuth]);

  return <>{children}</>;
}