"use client";

import { useAuth } from "./use-auth";

export function useRole() {
  const { user } = useAuth();

  return user?.role ?? null;
}