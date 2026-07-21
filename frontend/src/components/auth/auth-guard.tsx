"use client";

import {
  ReactNode,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
} from "react";

import {
  useAuth,
} from "@/hooks/use-auth";

interface Props {
  children: ReactNode;
}

export function AuthGuard({
  children,
}: Props) {

  const router =
    useRouter();

  const { user } =
    useAuth();

  useEffect(() => {

    if (!user) {
      router.push(
        "/login"
      );
    }

  }, [user, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}