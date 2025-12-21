"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function TopNav() {
  const { status } = useSession();

  return (
    <header className="border-b border-zinc-200/70 bg-white/70 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/60">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Alrahma
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <Link
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
              href="/about"
            >
              من نحن
            </Link>
            <Link
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
              href="/dashboard"
            >
              لوحة التحكم
            </Link>
            <Link
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
              href="/profile"
            >
              الملف الشخصي
            </Link>
            <Link
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
              href="/settings"
            >
              الإعدادات
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {status === "authenticated" ? (
            <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>
              تسجيل الخروج
            </Button>
          ) : (
            <Link href="/login">
              <Button size="sm">تسجيل الدخول</Button>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
