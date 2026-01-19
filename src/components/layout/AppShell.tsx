"use client";

import * as React from "react";

import { TopNav } from "@/components/layout/TopNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="py-8">{children}</main>
    </div>
  );
}
