"use client";

import type {
  ReactNode,
} from "react";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import {
  AppSidebar,
} from "./app-sidebar";

import {
  AppHeader,
} from "./app-header";

import {
  AppBreadcrumb,
} from "./app-breadcrumb";

interface Props {

  children: ReactNode;

}

export function DashboardLayout({

  children,

}: Props) {

  return (

    <SidebarProvider

      defaultOpen

    >

      {/* ===================================================== */}
      {/* SIDEBAR */}
      {/* ===================================================== */}

      <AppSidebar />

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <SidebarInset

        className="
          min-h-screen
          bg-muted/30
        "

      >

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

     <header
  className="
    sticky
    top-0
    z-40
    border-b
    bg-background
  "
>

    <AppHeader />

</header>

        {/* ===================================================== */}
        {/* CONTENT */}
        {/* ===================================================== */}

      <main
  className="
    flex-1
    overflow-auto
    bg-muted/20
  "
>

  <div
    className="
      w-full
      space-y-6
      p-6
    "
  >

    <AppBreadcrumb />

    {children}

  </div>

</main>

      </SidebarInset>

    </SidebarProvider>

  );

}