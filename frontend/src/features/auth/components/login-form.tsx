"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {

  const router = useRouter();

  const setAuth =
    useAuthStore(
      (state) => state.setAuth
    );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const response =
        await authService.login({
          email,
          password,
        });

      setAuth(
        response.data.token,
        response.data.user
      );

      switch (
        response.data.user.role
      ) {

        case "ADMIN":
          router.push(
            "/dashboard/admin"
          );
          break;

        case "MANAGER":
          router.push(
            "/dashboard/manager"
          );
          break;

        case "MARKETING":
          router.push(
            "/dashboard/marketing"
          );
          break;

        case "SALES":
          router.push(
            "/dashboard/sales"
          );
          break;

        case "FINANCE":
          router.push(
            "/dashboard/finance"
          );
          break;

        default:
          router.push(
            "/dashboard"
          );
      }

    } catch {

      setError(
        "Wrong Email or password"
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="
        space-y-4
      "
    >

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Signing In..."
          : "Sign In"}
      </Button>

    </form>
  );
}