"use client";

import { MainMailBar } from "@/components/layout/MainMailBar";
import { MainNavBar } from "@/components/layout/MainNavBar";

export function SiteHeader({ showMainMail = true }: { showMainMail?: boolean }) {
  return (
    <>
      {showMainMail ? <MainMailBar /> : null}
      <MainNavBar />
    </>
  );
}
