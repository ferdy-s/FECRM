"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {

  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {

    if (!user) {
      router.replace("/login");
      return;
    }

    switch (user.role) {

      case "ADMIN":
        router.replace("/dashboard/admin");
        break;

      case "MANAGER":
        router.replace("/dashboard/manager");
        break;

      case "SALES":
        router.replace("/dashboard/sales");
        break;

      case "MARKETING":
        router.replace("/dashboard/marketing");
        break;

      case "FINANCE":
        router.replace("/dashboard/finance");
        break;

      default:
        router.replace("/login");
    }

  }, [user, router]);

  return null;
}